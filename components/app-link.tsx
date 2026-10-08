import type { ComponentProps } from "react";

/** Document navigation avoids the production RSC navigation failure in Vinext. */
export default function AppLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
