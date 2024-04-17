import MillionLint from "@million/lint"
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        domains: ["res.cloudinary.com"],
    },
    // basePath: '/nitprofile-client'
    webpack: (config) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        config.resolve.fallback = {
            process: require.resolve('process/browser'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
            buffer: require.resolve('buffer'),
            asset: require.resolve('assert'),
        }
        config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' })
        config.plugins.push(
            new webpack.ProvidePlugin({
              Buffer: ['buffer', 'Buffer'],
              process: 'process/browser',
            })
        )
        return config
    }

}
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);

export default nextConfig