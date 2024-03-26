import MillionLint from "@million/lint"
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com"],
    },
}
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);

export default nextConfig