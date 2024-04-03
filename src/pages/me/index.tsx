import { useEffect, useState } from "react";
import { useWorkout } from "@/hooks/useWorkout";
import Worksheet from "@/components/card/Worksheet";
import WorkoutCard from "@/components/card/WorkoutCard";
import { UserWorkoutsAndWorksheetsDTO } from "@/interfaces/interfaces";

const MyWorkoutsPage = () => {
  const { fetchUserWorkouts, startWorkout } = useWorkout();
  const [userWorkouts, setUserWorkouts] =
    useState<UserWorkoutsAndWorksheetsDTO>();

  useEffect(() => {
    const fetchData = async () => {
      const userWorkoutsData = await fetchUserWorkouts();
      setUserWorkouts(userWorkoutsData);
    };

    fetchData();
  }, []);

  const handleStart = (id: number) => {
    startWorkout(id);
  };

  if (!userWorkouts) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h1 className="text-4xl font-bold text-slate-700 mb-3">
          Seus treinos
        </h1>
        <div className="flex flex-wrap gap-5">
          {userWorkouts.worksheets.map((worksheet) => {
            return (
              <Worksheet
                isArchived={false}
                worksheet={worksheet}
                handleStart={handleStart}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-8 text-center"></div>
      <div className="my-8">
        <h1 className="text-4xl font-bold text-slate-700 mb-3">
          Treinos Realizados
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {userWorkouts.workouts.map((workout) => {
            return <WorkoutCard workout={workout} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyWorkoutsPage;
