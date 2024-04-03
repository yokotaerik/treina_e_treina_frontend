import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWorkout } from "@/hooks/useWorkout";
import { WorkoutStatsDTO } from "@/interfaces/interfaces";
import WorkoutCard from "@/components/card/WorkoutCard";
import { stat } from "fs";
import Worksheet from "@/components/card/Worksheet";

function WorkoutPage() {
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
    <div className="bg-white p-8 flex flex-col gap-2 w-full md:w-1/3">
      <h1 className="text-5xl font-bold mb-4 text-orange-600">
        {stats.worksheet.name}
      </h1>
      <h1 className="text-4xl font-bold mb-4 text-orange-600">
        Melhores séries
      </h1>
      {stats.bestSets.map((set) => (
        <div key={set.id}>
          <p>Exercício: {set.exercise}</p>
          <p>Carga: {set.weight}</p>
          <p>Reps: {set.reps}</p>
          <p>Descanso: {set.minutesResting}</p>
          <p>Obs: {set.notes}</p>
        </div>
      ))}
      <h1 className="text-4xl font-bold mb-4 text-orange-600">
        Séries mais pesadas
      </h1>
      {stats.heaviestSets.map((set) => (
        <div key={set.id}>
          <p>Exercício: {set.exercise}</p>
          <p>Carga: {set.weight}</p>
          <p>Reps: {set.reps}</p>
          <p>Descanso: {set.minutesResting}</p>
          <p>Obs: {set.notes}</p>
        </div>
      ))}
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Treinos</h1>
      {stats.workouts.map((workout) => (
        <div key={workout.id}>
          <WorkoutCard workout={workout} />
        </div>
      ))}
    </div>
  );
}

export default WorkoutPage;
