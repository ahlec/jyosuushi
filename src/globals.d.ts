declare module "*.svg" {
  const inlined: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  export default inlined;
}

declare module "*.jpg";

declare const CONFIG_GOOGLE_ANALYTICS_TRACKING_ID: string;
