import { ReaderPage } from "@/features/pages/reader";
export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return <ReaderPage bookId={id} />;
}
