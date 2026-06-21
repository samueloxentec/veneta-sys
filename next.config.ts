import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const politicaCSP = [
  "default-src 'self'",
  // unsafe-eval apenas em dev (React DevTools precisa, produção não)
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Tailwind injeta estilos inline; Google Fonts para Space Grotesk e Inter
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // data: para QR codes gerados no cliente; Supabase Storage para imagens
  "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in",
  // Supabase (auth + db + edge functions) e Stripe (checkout API)
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.stripe.com",
  // Stripe Checkout roda em iframe próprio
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  // Three.js e GSAP usam Web Workers via blob
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Substituto moderno do X-Frame-Options
  "frame-ancestors 'none'",
  // Força HTTPS para sub-recursos em produção
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["three"],

  // Remove o header "X-Powered-By: Next.js" — não expõe a stack
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Mantido por compatibilidade com browsers antigos (Chrome <40, IE)
          // frame-ancestors no CSP cobre os modernos
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // camera=(self) necessário para QR code na página de validação
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: politicaCSP },
          // HSTS: força HTTPS por 1 ano — ignorado em HTTP (localhost)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
