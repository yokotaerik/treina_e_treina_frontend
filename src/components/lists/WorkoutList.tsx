import { WorkoutResponseDTO } from "@/hooks/useWorkout";
import Link from "next/link";

interface WorkoutListProps {
  workouts: WorkoutResponseDTO[];
}

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  return (
    <div>
      <div className="flex gap-4">
        {workouts.map((workout: WorkoutResponseDTO, index: number) => (
          <div key={index} className="bg-white shadow-md p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold ">
                {workout.worksheet.name}
              </h2>
              <p className="text-sm text-gray-600 ">
                Realizado: {workout.createdAt.toString()}
              </p>
              <Link href={`/workout/${workout.id}`}>
                <button className="bg-orange-500 text-white hover:underline p-2">
                  Detalhes
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
