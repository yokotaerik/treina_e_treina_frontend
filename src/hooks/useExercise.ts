import { api } from "@/utils/api";
import { useState } from "react";
import Swal from "sweetalert2";
import { ExerciseInfoResponseDTO } from "./useWorkout";

// Definindo o formato dos dados para adicionar um novo exercício
export interface AddExerciseInfoDTO {
  name: string;
}

// Hook para gerenciar operações relacionadas aos exercícios
const useExercise = () => {
  // Estado para armazenar a lista de informações dos exercícios
  const [exerciseInfoList, setExerciseInfoList] = useState<
    ExerciseInfoResponseDTO[]
  >([]);

  // Função para exibir um alerta de erro
  const showErrorAlert = (error: string) => {
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
  };

  // Função para adicionar um novo exercício
  const addNewExercise = async (data: AddExerciseInfoDTO) => {
    // Verificar se os campos estão preenchidos
    if (data.name === "") {
      Swal.fire({
        title: "Error",
        text: "Preencha todos os campos!",
        icon: "error",
      });
      return; // Se os campos não estiverem preenchidos, encerre a função
    }

    try {
      const response = await api.post("/exercise/add", data);
      // Manipular a resposta se necessário
      Swal.fire({
        title: "Success",
        text: response.data.message, // Supondo que o backend retorne uma mensagem de sucesso
        icon: "success",
      });
      return response.data; // Retornar dados se necessário
    } catch (error: any) {
      showErrorAlert(error.response.data);
      throw error; // Relançar o erro se necessário
    }
  };

  // Função para buscar todos os exercícios
  const fetchExercises = async () => {
    try {
      const response = await api.get("/exercise/all");
      setExerciseInfoList(response.data);
      // Manipular a resposta adicionalmente se necessário
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.message);
      throw error; // Relançar o erro se necessário
    }
  };

  // Retornar as funções e estado necessários para gerenciar exercícios
  return {
    exerciseInfoList,
    addNewExercise,
    fetchExercises,
  };
};

export default useExercise;
