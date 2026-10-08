import { NatureGamePage } from "@/features/pages/nature-game";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NatureGamePage gameId={id} />;
}
