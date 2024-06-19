/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
        prependData: `@import "./_mantine.scss";`,
    },
    output: 'standalone',
};

export default nextConfig;
