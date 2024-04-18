/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.cloudinary.com",
            },
        ],
    },
    basePath: "/nitprofile-client",
}
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);

export default nextConfig
