import React, { useState } from "react";

export interface AddExerciseInfoDTO {
  name: string;
}

interface CreateExerciseFormProps {
  handleAdd: (exerciseInfo: AddExerciseInfoDTO) => void;
}

const CreateExerciseForm = ({ handleAdd }: CreateExerciseFormProps) => {
  const [exerciseInfo, setExerciseInfo] = useState<AddExerciseInfoDTO>({
    name: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExerciseInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAdd(exerciseInfo);
    // Resetar o estado após a submissão do formulário
    setExerciseInfo({ name: "" });
  };

  return (
    <div className="p-8 bg-white w-full">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        Adicionar Exercício
      </h2>
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-2">
        <label className="block  text-lg font-semibold text-gray-800">
          Nome do exercicio:
        </label>
        <input
          className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
          name="name"
          value={exerciseInfo.name}
          onChange={handleChange}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 font-semibold hover:bg-orange-600 w-full"
          type="submit"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default CreateExerciseForm;
