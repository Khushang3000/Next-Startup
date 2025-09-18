import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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

export default nextConfig;
