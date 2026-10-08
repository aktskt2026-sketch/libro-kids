export interface SupabasePublicConfig {
  url: string;
  publishableKey: string;
}
/** Configuration only. Does not initialize a client or make network requests. */
export function getSupabaseConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return null;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== "https:" &&
      !(
        parsed.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(parsed.hostname)
      )
    )
      return null;
    if (!publishableKey.startsWith("sb_publishable_")) return null;
    return { url, publishableKey };
  } catch {
    return null;
  }
}
