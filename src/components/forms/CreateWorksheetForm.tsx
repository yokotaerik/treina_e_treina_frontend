import { useState } from "react";
import Select from "react-select";
import {
  ExerciseInfoResponseDTO,
  useWorkout,
  CreateWorkoutDTO,
  AddExerciseDTO,
} from "@/hooks/useWorkout";

interface ExercisesInWorkoutProps {
  exerciseId: number;
  numberOfSets: number;
  notes: string;
}

interface CreateWorksheetFormProps {
  exercises: ExerciseInfoResponseDTO[];
}

const CreateWorksheetForm = ({ exercises }: CreateWorksheetFormProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null
  );
  const [numberOfSets, setNumberOfSets] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [exercisesInWorkout, setExercisesInWorkout] = useState<
    ExercisesInWorkoutProps[]
  >([]);
  const { addWorkoutTemplate } = useWorkout();

  const handleAddWorkout = () => {
    const exercisesDTOS: AddExerciseDTO[] = exercisesInWorkout.map((data) => ({
      exerciseId: data.exerciseId,
      numberOfSets: data.numberOfSets,
      notes: data.notes,
    }));

    const data: CreateWorkoutDTO = {
      name: workoutName,
      description: workoutDescription,
      exercisesDTOS: exercisesDTOS,
    };

    addWorkoutTemplate(data);
  };

  const removeExercise = (indexToRemove: number) => {
    setExercisesInWorkout((prevState) =>
      prevState.filter((_, index) => index !== indexToRemove)
    );
  };

  const addExercise = () => {
    if (selectedExerciseId && numberOfSets > 0) {
      const newExercise: ExercisesInWorkoutProps = {
        exerciseId: selectedExerciseId,
        numberOfSets: numberOfSets,
        notes: notes,
      };
      setExercisesInWorkout((prevState) => [...prevState, newExercise]);
      setSelectedExerciseId(null);
      setNumberOfSets(0);
      setNotes("");
    }
  };

  const handleNumberOfSetsChange = (index: number, value: number) => {
    const updatedExercisesInWorkout = [...exercisesInWorkout];
    updatedExercisesInWorkout[index].numberOfSets = value;
    setExercisesInWorkout(updatedExercisesInWorkout);
  };

  const handleNotesChange = (index: number, value: string) => {
    const updatedExercisesInWorkout = [...exercisesInWorkout];
    updatedExercisesInWorkout[index].notes = value;
    setExercisesInWorkout(updatedExercisesInWorkout);
  };

  return (
    <div className="p-8 bg-white w-full">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">
        Criar o treino
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-800">
          Nome do treino:
        </label>
        <input
          className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
          type="text"
          placeholder="Nome do treino"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-800">
          Descrição do treino:
        </label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
          placeholder="Descrição do treino"
          value={workoutDescription}
          onChange={(e) => setWorkoutDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor=""
          className="block mb-2 text-lg font-semibold text-gray-800"
        >
          Catálogo de exercicios:
        </label>
        <Select
          value={
            selectedExerciseId
              ? {
                  value: selectedExerciseId,
                  label:
                    exercises.find(
                      (exercise) => exercise.id === selectedExerciseId
                    )?.name || "",
                }
              : null
          }
          onChange={(selectedOption) =>
            setSelectedExerciseId(selectedOption.value)
          }
          options={exercises.map((exercise) => ({
            value: exercise.id,
            label: exercise.name,
          }))}
          isSearchable={true}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label className="block mb-2 text-lg font-semibold text-gray-800">
          Número de séries:
        </label>
        <input
          className="border border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:border-orange-500"
          type="number"
          placeholder="Número de séries"
          value={numberOfSets}
          onChange={(e) => setNumberOfSets(parseInt(e.target.value))}
        />
        <label className="block mb-2 text-lg font-semibold text-gray-800">
          Alguma observação?
        </label>
        <textarea
          className="border border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:border-orange-500"
          placeholder="Alguma observação?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white px-3 py-2 font-semibold hover:bg-orange-600 w-full"
          onClick={addExercise}
        >
          Adicionar exercício
        </button>
      </div>
      {exercisesInWorkout.length > 0 ? (
        <p className="text-2xl font-bold text-orange-600 mb-2">Exercícios</p>
      ) : null}
      <div className="flex flex-wrap gap-4">
        {exercisesInWorkout.map((exercise, index) => (
          <div className="mb-4" key={index}>
            <p className="text-xl font-bold">
              {exercises.find((ex) => ex.id === exercise.exerciseId)?.name}
            </p>
            <div className="mb-2">
              <label
                htmlFor=""
                className="block mb-2 text-lg font-semibold text-gray-800"
              >
                Séries:
              </label>
              <input
                className="border border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:border-orange-500 w-full"
                type="number"
                value={exercise.numberOfSets}
                min={1}
                onChange={(e) =>
                  handleNumberOfSetsChange(index, parseInt(e.target.value))
                }
              />
              <label
                htmlFor=""
                className="block mb-2 text-lg font-semibold text-gray-800"
              >
                Observações:
              </label>
              <textarea
                className="border border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:border-orange-500 w-full"
                value={exercise.notes}
                onChange={(e) => handleNotesChange(index, e.target.value)}
              />
              <button
                className="bg-red-700 text-white px-3 py-2 font-semibold  block hover:bg-red-900 mt-4 w-full "
                onClick={() => removeExercise(index)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      {exercisesInWorkout.length > 0 ? (
        <button className="bg-orange-500 text-white px-4 py-2 font-semibold hover:bg-orange-600 w-full">
          Adicionar o treino!
        </button>
      ) : null}
    </div>
  );
};

export default CreateWorksheetForm;
