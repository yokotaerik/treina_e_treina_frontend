import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWorkout } from "@/hooks/useWorkout";
import { WorkoutStatsDTO } from "@/interfaces/interfaces";
import WorkoutCard from "@/components/card/WorkoutCard";
import { stat } from "fs";
import Worksheet from "@/components/card/Worksheet";

function WorkoutStatsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchUserWorkoutsStatsByWorksheetId } = useWorkout();

  const [stats, setStats] = useState<WorkoutStatsDTO>();

  useEffect(() => {
    const fetchData = async (id: string) => {
      const workoutData = await fetchUserWorkoutsStatsByWorksheetId(id);
      setStats(workoutData);
    };

    if (id) {
      fetchData(id as string);
    }
  }, [id]);

  if (!stats) {
    return (
      <div>
        <p>Nenhum dado encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 p-8 flex flex-col gap-2 w-full md:w-1/3">
      <h1 className="text-5xl font-bold mb-4 text-slate-800">
        {stats.worksheet.name}
      </h1>
      <h2 className="text-4xl font-bold mb-4 text-slate-700">
        Melhores séries
      </h2>
      {stats.bestSets.map((set, index) => (
        <div key={set.id} className="bg-white shadow-md p-4">
          <p className="text-2xl text-gray-800 font-bold">{set.exercise}</p>
          <div className="flex justify-between">
            <p className="text-xl font-bold">Carga:</p>
            <p className="text-lg text-gray-800 font-semibold">{set.weight}</p>
            <p className="text-xl font-bold">Reps:</p>
            <p className="text-lg text-gray-800 font-semibold">{set.reps}</p>
            <p className="text-xl font-bold">Descanso:</p>
            <p className="text-lg text-gray-800 font-semibold">
              {set.minutesResting}
            </p>
          </div>
          <p className="text-xl font-bold">Obs:</p>
          <p className="text-lg text-gray-800 font-semibold">{set.notes}</p>
        </div>
      ))}
      <h2 className="text-4xl font-bold mb-4 text-slate-700">
        Séries mais pesadas
      </h2>
      {stats.heaviestSets.map((set, index) => (
        <div key={set.id} className="bg-white shadow-md p-4 ">
          <p className="text-2xl text-gray-800 font-bold">{set.exercise}</p>
          <div className="flex justify-between">
            <p className="text-xl font-bold">Carga:</p>
            <p className="text-lg text-gray-800 font-semibold">{set.weight}</p>
            <p className="text-xl font-bold">Reps:</p>
            <p className="text-lg text-gray-800 font-semibold">{set.reps}</p>
            <p className="text-xl font-bold">Descanso:</p>
            <p className="text-lg text-gray-800 font-semibold">
              {set.minutesResting}
            </p>
          </div>
          <p className="text-xl font-bold">Obs:</p>
          <p className="text-lg text-gray-800 font-semibold">{set.notes}</p>
        </div>
      ))}
      <h2 className="text-4xl font-bold mb-4 text-slate-700">Treinos</h2>
      {stats.workouts.map((workout) => (
        <div key={workout.id}>
          <WorkoutCard workout={workout} />
        </div>
      ))}
    </div>
  );
}

export default WorkoutStatsPage;
