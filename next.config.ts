import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  images:{
    dangerouslyAllowSVG:true,
    remotePatterns:[{
      protocol: 'https',
      hostname: '*', //hostname is "*" to allow for images from all sources.
      //now image will we allowed from that link but it won't be rendered, (you could see that in the terminal why.)
      // ⨯ The requested resource "https://placehold.co/600x400" has type "image/svg+xml" but dangerouslyAllowSVG is disabled. Consider adding the "unoptimized" property to the <Image>.
      //that's becuase of type image/svg+xml so we gotta allow it, and we did that on line 6.
      //later-on we'll remove this dangerously allow svg, but keep in mind that later on these placeholder images will be comming from different sources, and they won't be in svg
      //now go back to startup card.
    }]
    
  },
  //PPR
  experimental: {//this is experimental rn but soon it'll become stable.
      ppr: 'incremental'
  },
  devIndicators: {
  //   appIsrStatus: true,
  //   buildActivity: true,
  //   buildActivityPosition: "bottom-right"//these three are depricated btw.

  

  position: "top-left"
  }//these will help us visualize what's happening with ppr. now go to the details page.tsx see experimental_ppr
  
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "personal-01v",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});