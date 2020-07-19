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

declare const CONFIG_GOOGLE_ANALYTICS_TRACKING_ID: string;
declare const JYOSUUSHI_CURRENT_SEMVER: string;
