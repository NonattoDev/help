import FeedbackCard from "@/components/CardFeedback/Feedback";
import prisma from "@/utils/prismaInstance";

const getFeedbacks = async () => {
  const feedbacks = await prisma.feedbacks.findMany({
    include: {
      aluno: true,
      professor: true,
    },
  });

  return {
    feedbacks,
  };
};
export default async function FeedBacks() {
  const { feedbacks } = await getFeedbacks();
  return (
    <div>
      <h1 className="text-center font-semibold">Feedbacks</h1>
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
}
