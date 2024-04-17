import MillionLint from "@million/lint"
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        domains: ["res.cloudinary.com"],
    },
    basePath: '/nitprofile-client'

}
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);

export default nextConfig