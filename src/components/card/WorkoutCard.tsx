import { WorkoutResponseDTO } from "@/hooks/useWorkout";
import Link from "next/link";

interface WorkoutProps {
  workout: WorkoutResponseDTO;
}

const WorkoutCard = ({ workout }: WorkoutProps) => {
  return (
    <div className="bg-white shadow-md p-6">
      <div className="flex gap-4 flex-col">
        <h2 className="text-xl font-semibold">{workout.worksheet.name}</h2>
        <p className="text-sm text-gray-600">
          Realizado: {workout.createdAt.toString()}
        </p>
        <Link href={`/workout/${workout.id}`}>
          <button className="bg-orange-500 text-white hover:underline p-2">
            Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;
