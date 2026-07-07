import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config = () => {
  const config = {
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/guide",
          permanent: true,
        },
      ];
    },
    rewrites: async () => {
      return [
        {
          source: "/api/miex/:path*",
          destination: "https://api.miex.one/api/v1/:path*",
        },
        {
          source: "/api/gateway/:path*",
          destination: "https://devgateway.miex.one/api/:path*",
        },
      ];
    },
    env: {},
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },
  };

  return withNextIntl(config);
};

export default config;
