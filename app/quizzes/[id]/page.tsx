import { QuizPlayerPage } from "@/features/pages/quiz-player";
export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return <QuizPlayerPage quizId={id} />;
}
