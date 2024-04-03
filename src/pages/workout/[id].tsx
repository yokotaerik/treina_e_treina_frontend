import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWorkout } from "@/hooks/useWorkout";
import {
  WorkoutResponseDTO,
  PatchSetDTO,
  ExerciseResponseDTO,
} from "@/interfaces/interfaces";

function WorkoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchWorkoutById, updatedSets } = useWorkout();

  const [workout, setWorkout] = useState<WorkoutResponseDTO>();
  const [setsData, setSetsData] = useState<PatchSetDTO[]>([]);

  useEffect(() => {
    const fetchWorkoutData = async (id: string) => {
      const workoutData = await fetchWorkoutById(id);
      setWorkout(workoutData);

      const allSetsData = workoutData.exercises.flatMap(
        (exercise: ExerciseResponseDTO) =>
          exercise.sets.map((set) => ({
            id: set.id,
            weight: set.weight,
            reps: set.reps,
            minutesResting: set.minutesResting,
            notes: set.notes,
          }))
      );
      setSetsData(allSetsData);
    };

    if (id) {
      fetchWorkoutData(id as string);
    }
  }, [id]);

  const handleSetDataChange = (
    setId: number,
    field: keyof PatchSetDTO,
    value: string
  ) => {
    const updatedSetsData = setsData.map((set) => {
      if (set.id === setId) {
        return { ...set, [field]: value };
      }
      return set;
    });

    setSetsData(updatedSetsData);
  };

  const handleSubmit = async () => {
    await updatedSets(setsData);
  };

  if (!workout) {
    return (
      <div>
        <p>Erro ao encontrar o treino</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 flex flex-col gap-2">
      <h1 className="text-5xl font-bold text-slate-800 mb-4">
        {workout.worksheet.name}
      </h1>
      <p className="text-3xl font-bold text-slate-700">Descrição:</p>
      <p className="text-lg font-semibold ">{workout.worksheet.description}</p>
      <p className="text-3xl font-bold text-slate-700">Criado em:</p>
      <span className="text-lg font-semibold">
        {new Date(workout.createdAt).toLocaleDateString()}
      </span>
      <h2 className="text-3xl font-bold text-slate-700">Exercícios:</h2>
      {workout.exercises.map((exercise, index) => (
        <div key={exercise.id} className="mb-8 flex flex-col gap-1">
          <h3 className="text-2xl text-gray-700 font-bold ">
            {exercise.info.name}
          </h3>
          <p className="text-xl font-semibold ">Detalhes do exercício:</p>
          <p className="text-lg text-gray-800 font-semibold">
            {workout.worksheet.exercises[index]?.notes}
          </p>
          <ul className="my-2">
            {exercise.sets.map((set, index) => (
              <li key={set.id} className="flex flex-col mb-4">
                <p className="font-bold text-gray-700 text-lg mb-2">
                  {index + 1}º serie
                </p>
                <div className="flex flex-row">
                  <input
                    type="number"
                    value={setsData.find((s) => s.id === set.id)?.reps || ""}
                    onChange={(e) =>
                      handleSetDataChange(set.id, "reps", e.target.value)
                    }
                    className="p-2 border w-full"
                    placeholder="Reps"
                  />
                  <input
                    type="number"
                    value={setsData.find((s) => s.id === set.id)?.weight || ""}
                    onChange={(e) =>
                      handleSetDataChange(set.id, "weight", e.target.value)
                    }
                    className="p-2 border w-full"
                    placeholder="Carga (kg)"
                  />
                  <input
                    type="number"
                    value={
                      setsData.find((s) => s.id === set.id)?.minutesResting ||
                      ""
                    }
                    onChange={(e) =>
                      handleSetDataChange(
                        set.id,
                        "minutesResting",
                        e.target.value
                      )
                    }
                    className="p-2 border w-full"
                    placeholder="Descanso (min)"
                  />
                </div>
                <textarea
                  className="border border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:border-slate-700 w-full"
                  placeholder="Alguma observação?"
                  value={setsData.find((s) => s.id === set.id)?.notes || ""}
                  onChange={(e) =>
                    handleSetDataChange(set.id, "notes", e.target.value)
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 w-full md:w-auto"
      >
        Enviar
      </button>
    </div>
  );
}

export default WorkoutPage;
