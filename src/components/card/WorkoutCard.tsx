import { WorkoutResponseDTO } from "@/interfaces/interfaces";
import Link from "next/link";

interface WorkoutProps {
  workout: WorkoutResponseDTO;
}

const WorkoutCard = ({ workout }: WorkoutProps) => {
  return (
    <div className="bg-white shadow-md p-6 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold">{workout.worksheet.name}</h2>
          <p className="text-sm text-gray-600">
            Realizado: {workout.createdAt.toString()}
          </p>
        </div>
        <Link href={`/workout/${workout.id}`}>
          <button className="bg-slate-500 text-white hover:underline p-2">
            Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;
