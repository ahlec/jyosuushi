declare module "*.svg" {
  const inlined: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  export default inlined;
}

declare module "*.jpg";
declare module "*.png";

declare const CONFIG_BUG_REPORT_FORM_LINK: string;
declare const CONFIG_FEEDBACK_FORM_LINK: string;
declare const CONFIG_GOOGLE_ANALYTICS_TRACKING_ID: string;
declare const JYOSUUSHI_CURRENT_SEMVER: string;
