// vite.config.ts
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.BASE_URL || "/",
    envPrefix: "VITE_",
    // Resolve configuration
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./")
        },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "./components")
        },
        {
          find: "@pages",
          replacement: path.resolve(__dirname, "./pages")
        },
        {
          find: "@contexts",
          replacement: path.resolve(__dirname, "./contexts")
        },
        {
          find: "@services",
          replacement: path.resolve(__dirname, "./services")
        },
        {
          find: "@utils",
          replacement: path.resolve(__dirname, "./utils")
        },
        {
          find: "@types",
          replacement: path.resolve(__dirname, "./types")
        },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "./assets")
        }
      ]
    },
    // Server configuration
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      open: true,
      fs: {
        strict: true,
        allow: [".."]
      },
      watch: {
        usePolling: true,
        interval: 100
      },
      hmr: {
        overlay: true
      }
    },
    // Build configuration
    build: {
      target: "esnext",
      minify: "esbuild",
      sourcemap: mode === "development",
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            ui: ["@headlessui/react", "@heroicons/react"],
            utils: ["date-fns", "clsx", "tailwind-merge"],
            vendor: ["@supabase/supabase-js", "zustand"]
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash][ext]"
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
      exclude: ["lucide-react"],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis"
        }
      }
    },
    // CSS configuration
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: "camelCaseOnly"
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variables.scss";
            @import "@/styles/mixins.scss";
          `
        }
      }
    }
    // Development server proxy (if needed)
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuXG4vLyBHZXQgdGhlIGN1cnJlbnQgZmlsZSdzIGRpcmVjdG9yeVxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgLy8gTG9hZCBlbnYgZmlsZSBiYXNlZCBvbiBgbW9kZWAgaW4gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnlcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgYmFzZTogZW52LkJBU0VfVVJMIHx8ICcvJyxcbiAgICBlbnZQcmVmaXg6ICdWSVRFXycsXG4gICAgXG4gICAgLy8gUmVzb2x2ZSBjb25maWd1cmF0aW9uXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAY29tcG9uZW50cycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2NvbXBvbmVudHMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0BwYWdlcycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3BhZ2VzJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAY29udGV4dHMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jb250ZXh0cycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQHNlcnZpY2VzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc2VydmljZXMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0B1dGlscycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3V0aWxzJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAdHlwZXMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi90eXBlcycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQGFzc2V0cycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2Fzc2V0cycpXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuXG4gICAgLy8gU2VydmVyIGNvbmZpZ3VyYXRpb25cbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBmczoge1xuICAgICAgICBzdHJpY3Q6IHRydWUsXG4gICAgICAgIGFsbG93OiBbJy4uJ11cbiAgICAgIH0sXG4gICAgICB3YXRjaDoge1xuICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMTAwXG4gICAgICB9LFxuICAgICAgaG1yOiB7XG4gICAgICAgIG92ZXJsYXk6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQnVpbGQgY29uZmlndXJhdGlvblxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgICBzb3VyY2VtYXA6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE2MDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAgIHVpOiBbJ0BoZWFkbGVzc3VpL3JlYWN0JywgJ0BoZXJvaWNvbnMvcmVhY3QnXSxcbiAgICAgICAgICAgIHV0aWxzOiBbJ2RhdGUtZm5zJywgJ2Nsc3gnLCAndGFpbHdpbmQtbWVyZ2UnXSxcbiAgICAgICAgICAgIHZlbmRvcjogWydAc3VwYWJhc2Uvc3VwYWJhc2UtanMnLCAnenVzdGFuZCddXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdW2V4dF0nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gT3B0aW1pemUgZGVwZW5kZW5jaWVzXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgICAgLy8gTm9kZS5qcyBnbG9iYWwgdG8gYnJvd3NlciBnbG9iYWxUaGlzXG4gICAgICAgIGRlZmluZToge1xuICAgICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQ1NTIGNvbmZpZ3VyYXRpb25cbiAgICBjc3M6IHtcbiAgICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZU9ubHknXG4gICAgICB9LFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICAgIEBpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xuICAgICAgICAgICAgQGltcG9ydCBcIkAvc3R5bGVzL21peGlucy5zY3NzXCI7XG4gICAgICAgICAgYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIERldmVsb3BtZW50IHNlcnZlciBwcm94eSAoaWYgbmVlZGVkKVxuICAgIC8vIHByb3h5OiB7XG4gICAgLy8gICAnL2FwaSc6IHtcbiAgICAvLyAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAvLyAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsY0FBYyxlQUFlO0FBQy9QLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFIb0csSUFBTSwyQ0FBMkM7QUFNbkwsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLEtBQUssUUFBUSxVQUFVO0FBR3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsTUFBTSxJQUFJLFlBQVk7QUFBQSxJQUN0QixXQUFXO0FBQUE7QUFBQSxJQUdYLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxXQUFXLElBQUk7QUFBQSxRQUMzQztBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLFdBQVcsY0FBYztBQUFBLFFBQ3JEO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxLQUFLLFFBQVEsV0FBVyxTQUFTO0FBQUEsUUFDaEQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxXQUFXLFlBQVk7QUFBQSxRQUNuRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLFdBQVcsWUFBWTtBQUFBLFFBQ25EO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxLQUFLLFFBQVEsV0FBVyxTQUFTO0FBQUEsUUFDaEQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxXQUFXLFNBQVM7QUFBQSxRQUNoRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLFdBQVcsVUFBVTtBQUFBLFFBQ2pEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsUUFBUTtBQUFBLFFBQ1IsT0FBTyxDQUFDLElBQUk7QUFBQSxNQUNkO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFdBQVcsU0FBUztBQUFBLE1BQ3BCLHVCQUF1QjtBQUFBLE1BQ3ZCLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLE9BQU8sQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsWUFDaEQsSUFBSSxDQUFDLHFCQUFxQixrQkFBa0I7QUFBQSxZQUM1QyxPQUFPLENBQUMsWUFBWSxRQUFRLGdCQUFnQjtBQUFBLFlBQzVDLFFBQVEsQ0FBQyx5QkFBeUIsU0FBUztBQUFBLFVBQzdDO0FBQUEsVUFDQSxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLFFBQ2YseUJBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsTUFDbEQsU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4QixnQkFBZ0I7QUFBQTtBQUFBLFFBRWQsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFHQSxLQUFLO0FBQUEsTUFDSCxjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUCxrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
