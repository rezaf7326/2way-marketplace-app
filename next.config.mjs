/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_SERVICE_URL:
      process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL,
  },
};

export default nextConfig;
