import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // headers:
  //   phase === PHASE_PRODUCTION_BUILD
  //     ? undefined
  //     : async () => [
  //         {
  //           source: "/",
  //           headers: [
  //             {
  //               key: "Content-Security-Policy",
  //               value:
  //                 "worker-src https://cdn.statically.io/gh/GuillaumeSD/Chesskit/main/public/engines/; connect-src https://cdn.statically.io/gh/GuillaumeSD/Chesskit/main/public/engines/",
  //             },
  //           ],
  //         },
  //         {
  //           source: "/play",
  //           headers: [
  //             {
  //               key: "Cross-Origin-Embedder-Policy",
  //               value: "require-corp",
  //             },
  //             {
  //               key: "Cross-Origin-Opener-Policy",
  //               value: "same-origin",
  //             },
  //           ],
  //         },
  //         {
  //           source: "/database",
  //           headers: [
  //             {
  //               key: "Cross-Origin-Embedder-Policy",
  //               value: "require-corp",
  //             },
  //             {
  //               key: "Cross-Origin-Opener-Policy",
  //               value: "same-origin",
  //             },
  //           ],
  //         },
  //       ],
});

export default withSentryConfig(nextConfig, {
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  org: process.env.SENTRY_ORG,
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  hideSourceMaps: true,
  disableLogger: true,
});
