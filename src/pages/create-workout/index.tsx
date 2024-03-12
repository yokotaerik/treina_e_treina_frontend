import { useEffect, useState } from "react";
import Link from "next/link";
import useExercise, { AddExerciseInfoDTO } from "@/hooks/useExercise";
import {
  ExerciseInfoResponseDTO,
  useWorkout,
  CreateWorkoutDTO,
  AddExerciseDTO,
} from "@/hooks/useWorkout";
import CreateWorksheetForm from "@/components/forms/CreateWorksheetForm";
import CreateExerciseForm from "@/components/forms/AddExerciseForm";

interface ExercisesInWorkoutProps {
  exercise: ExerciseInfoResponseDTO;
  numberOfSets: number;
  notes: string;
}

const CreateWorkoutPage = () => {
  const [exercises, setExercises] = useState<ExerciseInfoResponseDTO[]>([]);

  const { addNewExercise } = useExercise();
  const { fetchExercises } = useExercise();

  const fetchData = async () => {
    try {
      const exercisesData = await fetchExercises();
      setExercises(exercisesData);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (exerciseInfo: AddExerciseInfoDTO) => {
    await addNewExercise(exerciseInfo);
    await fetchData();
  };

  return (
    <div className="flex gap-2 flex-col w-full md:w-9/12 p-4">
      <CreateWorksheetForm exercises={exercises} />
      <CreateExerciseForm handleAdd={handleAdd} />
    </div>
  );
};

export default CreateWorkoutPage;
