/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ["media.themoviedb.org","image.tmdb.org"],
    },
    // env:{
    //     ACCESS_TOKEN:process.env.NEXT_PUBLIC_ACCESS_TOKEN
    // }
};

export default nextConfig;
