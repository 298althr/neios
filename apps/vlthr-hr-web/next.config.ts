import type { NextConfig } from "next";

// packages/* are imported as raw .ts source via tsconfig paths (no build step /
// node_modules link in the MVP). Files live under the workspace root so no
// externalDir override is needed.
const nextConfig: NextConfig = {};

export default nextConfig;
