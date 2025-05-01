import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    crossOrigin: 'anonymous',
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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: 'default-src https:; connect-src https: http://152.42.185.12; script-src https: \'unsafe-inline\' \'unsafe-eval\'; style-src https: \'unsafe-inline\''
                    }
                ],
            },
        ];
    },
};


export default nextConfig;