#!/bin/bash

# 🍕 Script de Instalação Automática - JáPede Cardápio VPS
# Autor: Sistema de Deploy Automatizado
# Data: $(date +%Y-%m-%d)

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de log
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se está executando como root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "Este script deve ser executado como root"
        log_info "Execute: sudo $0"
        exit 1
    fi
}

# Solicitar informações do usuário
get_user_input() {
    log_info "=== Configuração Inicial ==="
    
    read -p "Domínio do site (ex: meusite.com): " DOMAIN
    read -p "URL do Supabase (ex: http://localhost:8000): " SUPABASE_URL
    read -p "Chave anônima do Supabase: " SUPABASE_ANON_KEY
    read -p "Repositório Git (opcional, enter para pular): " GIT_REPO
    read -p "Diretório de instalação [/var/www/japede-cardapio]: " INSTALL_DIR
    
    # Valores padrão
    INSTALL_DIR=${INSTALL_DIR:-"/var/www/japede-cardapio"}
    
    log_info "Configuração:"
    log_info "  Domínio: $DOMAIN"
    log_info "  Supabase URL: $SUPABASE_URL"
    log_info "  Diretório: $INSTALL_DIR"
    
    read -p "Continuar com essa configuração? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warning "Instalação cancelada pelo usuário"
        exit 1
    fi
}

# Atualizar sistema
update_system() {
    log_info "Atualizando sistema..."
    apt update && apt upgrade -y
    log_success "Sistema atualizado"
}

# Instalar dependências
install_dependencies() {
    log_info "Instalando dependências base..."
    apt install -y curl wget git nginx nodejs npm build-essential ufw certbot python3-certbot-nginx
    
    # Instalar Node.js LTS
    log_info "Instalando Node.js LTS..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    apt-get install -y nodejs
    
    # Verificar versões
    log_info "Node.js version: $(node --version)"
    log_info "NPM version: $(npm --version)"
    
    log_success "Dependências instaladas"
}

# Configurar firewall
setup_firewall() {
    log_info "Configurando firewall..."
    ufw --force enable
    ufw allow ssh
    ufw allow 80
    ufw allow 443
    log_success "Firewall configurado"
}

# Configurar projeto
setup_project() {
    log_info "Configurando projeto..."
    
    # Criar diretório
    mkdir -p "$(dirname "$INSTALL_DIR")"
    
    if [[ -n "$GIT_REPO" ]]; then
        log_info "Clonando repositório..."
        git clone "$GIT_REPO" "$INSTALL_DIR"
    else
        log_info "Copiando arquivos locais..."
        cp -r . "$INSTALL_DIR"
    fi
    
    cd "$INSTALL_DIR"
    
    # Instalar dependências do projeto
    log_info "Instalando dependências do projeto..."
    npm install
    
    # Configurar variáveis de ambiente
    log_info "Configurando variáveis de ambiente..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

# Production Environment
NODE_ENV=production
EOF
    
    # Build da aplicação
    log_info "Fazendo build da aplicação..."
    npm run build
    
    # Configurar permissões
    chown -R www-data:www-data "$INSTALL_DIR"
    chmod -R 755 "$INSTALL_DIR"
    
    log_success "Projeto configurado"
}

# Configurar Nginx
setup_nginx() {
    log_info "Configurando Nginx..."
    
    # Backup da configuração existente (se houver)
    if [[ -f "/etc/nginx/sites-available/$DOMAIN" ]]; then
        cp "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-available/$DOMAIN.backup.$(date +%s)"
    fi
    
    # Criar configuração do Nginx
    cat > "/etc/nginx/sites-available/$DOMAIN" << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $INSTALL_DIR/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Handle React Router (SPA)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # API proxy (se necessário)
    # location /api/ {
    #     proxy_pass $SUPABASE_URL;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade \$http_upgrade;
    #     proxy_set_header Connection 'upgrade';
    #     proxy_set_header Host \$host;
    #     proxy_cache_bypass \$http_upgrade;
    # }

    # Deny access to sensitive files
    location ~ /\.(ht|env) {
        deny all;
        return 404;
    }
}
EOF
    
    # Ativar site
    ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
    
    # Remover configuração padrão se existir
    rm -f /etc/nginx/sites-enabled/default
    
    # Testar configuração
    if nginx -t; then
        systemctl restart nginx
        systemctl enable nginx
        log_success "Nginx configurado e ativado"
    else
        log_error "Erro na configuração do Nginx"
        exit 1
    fi
}

# Configurar SSL
setup_ssl() {
    if [[ "$DOMAIN" != "localhost" && "$DOMAIN" != "127.0.0.1" ]]; then
        log_info "Configurando SSL com Let's Encrypt..."
        
        # Aguardar DNS propagar
        log_info "Aguardando DNS propagar... (30s)"
        sleep 30
        
        # Obter certificado SSL
        if certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" --redirect; then
            log_success "SSL configurado com sucesso"
            
            # Configurar renovação automática
            (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
            log_success "Renovação automática de SSL configurada"
        else
            log_warning "Falha ao configurar SSL. Site funcionará apenas com HTTP."
        fi
    else
        log_warning "SSL não configurado para localhost"
    fi
}

# Configurar PM2 (opcional)
setup_pm2() {
    log_info "Configurando PM2 para servir aplicação..."
    npm install -g pm2
    
    cd "$INSTALL_DIR"
    
    # Criar configuração PM2
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'japede-cardapio',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: './dist',
      PM2_SERVE_PORT: 3000,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: '/index.html'
    }
  }]
};
EOF
    
    # Instalar pm2-serve
    pm2 install pm2-serve
    
    # Iniciar aplicação
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    log_success "PM2 configurado"
}

# Criar scripts de utilitários
create_utility_scripts() {
    log_info "Criando scripts de utilitários..."
    
    # Script de atualização
    cat > "$INSTALL_DIR/update.sh" << 'EOF'
#!/bin/bash
set -e

log_info() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

log_success() {
    echo -e "\033[0;32m[SUCCESS]\033[0m $1"
}

cd "$(dirname "$0")"

log_info "Atualizando aplicação..."

# Pull do repositório (se for git)
if [[ -d ".git" ]]; then
    git pull origin main
fi

# Instalar dependências
npm install

# Build
npm run build

# Reiniciar serviços
sudo systemctl reload nginx

# Reiniciar PM2 se estiver rodando
if command -v pm2 &> /dev/null; then
    pm2 restart japede-cardapio || true
fi

log_success "Aplicação atualizada com sucesso!"
EOF
    
    # Script de backup
    cat > "$INSTALL_DIR/backup.sh" << EOF
#!/bin/bash
set -e

BACKUP_DIR="/var/backups/japede-cardapio"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p "\$BACKUP_DIR"

echo "Fazendo backup da aplicação..."
tar -czf "\$BACKUP_DIR/japede-cardapio_\$DATE.tar.gz" -C "$(dirname "$INSTALL_DIR")" "$(basename "$INSTALL_DIR")"

echo "Backup salvo em: \$BACKUP_DIR/japede-cardapio_\$DATE.tar.gz"

# Manter apenas os 5 backups mais recentes
ls -t "\$BACKUP_DIR"/japede-cardapio_*.tar.gz | tail -n +6 | xargs -r rm
EOF
    
    # Tornar scripts executáveis
    chmod +x "$INSTALL_DIR/update.sh"
    chmod +x "$INSTALL_DIR/backup.sh"
    
    log_success "Scripts de utilitários criados"
}

# Função principal
main() {
    log_info "🍕 Iniciando instalação do JáPede Cardápio"
    
    check_root
    get_user_input
    
    log_info "=== Iniciando instalação ==="
    
    update_system
    install_dependencies
    setup_firewall
    setup_project
    setup_nginx
    setup_ssl
    create_utility_scripts
    
    log_info "=== Instalação concluída ==="
    log_success "🎉 JáPede Cardápio instalado com sucesso!"
    
    echo
    log_info "URLs de acesso:"
    if [[ "$DOMAIN" != "localhost" && "$DOMAIN" != "127.0.0.1" ]]; then
        log_info "  HTTP:  http://$DOMAIN"
        log_info "  HTTPS: https://$DOMAIN"
    else
        log_info "  Local: http://$DOMAIN"
    fi
    
    echo
    log_info "Scripts úteis criados:"
    log_info "  Atualizar: $INSTALL_DIR/update.sh"
    log_info "  Backup:   $INSTALL_DIR/backup.sh"
    
    echo
    log_info "Comandos úteis:"
    log_info "  Status Nginx:  systemctl status nginx"
    log_info "  Logs Nginx:    tail -f /var/log/nginx/error.log"
    log_info "  Testar SSL:    openssl s_client -connect $DOMAIN:443"
    
    echo
    log_warning "Lembre-se de:"
    log_warning "  1. Configurar DNS para apontar para este servidor"
    log_warning "  2. Verificar se o Supabase está acessível em: $SUPABASE_URL"
    log_warning "  3. Testar todas as funcionalidades do sistema"
    
    log_success "Instalação finalizada! 🚀"
}

# Executar função principal
main "$@"