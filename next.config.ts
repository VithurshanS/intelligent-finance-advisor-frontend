import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    crossOrigin: 'use-credentials',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's.yimg.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.zenfs.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;