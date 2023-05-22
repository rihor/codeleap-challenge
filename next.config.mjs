import { join } from "node:path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
		includePaths: [join("src", "styles")],
		prependData: `@import "~/styles/variables.scss";`,
	},
}

export default nextConfig
