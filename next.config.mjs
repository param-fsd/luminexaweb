/** @type {import('next').NextConfig} */
const nextConfig = {
  // The intro loader animation is a one-shot CSS reveal. React StrictMode's
  // dev-only mount→unmount→remount recreates its DOM and visibly replays the
  // reveal ("looping"). Disabling it makes the dev preview match production,
  // where StrictMode double-mounting never happens.
  reactStrictMode: false,
  serverExternalPackages: ["@google-cloud/dialogflow"],
};

export default nextConfig;