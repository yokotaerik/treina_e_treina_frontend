import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWorkout } from "@/hooks/useWorkout";
import Link from "next/link";
import { WorksheetResponseDTO } from "@/interfaces/interfaces";

function WorkoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchWorksheetById } = useWorkout();

  const [worksheet, setWorksheet] = useState<WorksheetResponseDTO>();

  useEffect(() => {
    const fetchWorkoutData = async (id: string) => {
      const workoutData = await fetchWorksheetById(id);
      setWorksheet(workoutData);
    };

    if (id) {
      fetchWorkoutData(id as string);
    }
  }, [id]);

  if (!worksheet) {
    return (
      <div>
        <p>Erro ao encontrar o treino</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 flex flex-col gap-2 w-full md:w-1/3">
      <h1 className="text-5xl font-bold mb-4 text-slate-800 ">
        {worksheet.name}
      </h1>
      <p className="text-3xl font-bold text-slate-600">Descrição:</p>
      <p className="text-lg font-semibold">{worksheet.description}</p>
      <h2 className="text-3xl font-bold text-slate-600">Exercícios</h2>
      {worksheet.exercises.map((exercise, index) => (
        <div key={exercise.id}>
          <h3 className="text-2xl font-bold mb-2 text-gray-700">
            {index + 1}º {exercise.info.name}
          </h3>
          <p className="text-xl font-bold"> Séries:</p>
          <p className="text-lg text-gray-800 font-semibold">
            {exercise.numberOfSets} séries
          </p>
          <p className="text-xl font-bold">Observações:</p>
          <p className="text-lg text-gray-800 font-semibold">
            {worksheet.exercises[index]?.notes}
          </p>
        </div>
      ))}
        <Link href={`/worksheet/info/${worksheet.id}`} 
        className="flex justify-center w-full mt-5">
          <button className="bg-slate-500 text-white hover:underline p-2 font-bold w-full">
            Treinos realizados dessa planilha
          </button>
        </Link>
    </div>
  );
}

export default WorkoutPage;
