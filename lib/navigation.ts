import { flushSync } from "react-dom";

/** Commit device-local profile/preferences before leaving the document. */
export function navigate(href: string, update?: () => void) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    throw new Error("App navigation requires an internal path");
  }
  if (update) flushSync(update);
  window.location.assign(href);
}
