declare module "*.svg" {
  const inlined: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  export default inlined;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.md" {
  const html: string;
  export default html;
}

declare const CONFIG_POSTHOG_API_HOST: string;
declare const CONFIG_POSTHOG_API_KEY: string;
declare const JYOSUUSHI_CURRENT_SEMVER: string;

type SvgIcon = React.ComponentClass<React.SVGProps<SVGSVGElement>>;
