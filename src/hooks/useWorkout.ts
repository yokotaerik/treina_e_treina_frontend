import { api } from "@/utils/api";
import Router from "next/router";
import Swal from "sweetalert2";

export interface WorkoutResponseDTO {
  id: number;
  worksheet: WorksheetResponseDTO;
  exercises: ExerciseResponseDTO[];
  createdAt: Date;
}

export interface WorksheetResponseDTO {
  id: number;
  name: string;
  description: string;
  exercises: ExerciseInWorksheetDTO[];
}

export interface ExerciseInWorksheetDTO {
  id: number;
  info: ExerciseInfoResponseDTO;
  numberOfSets: number;
  notes: string;
}

export interface UserWorkoutsAndWorksheetsDTO {
  worksheets: WorksheetResponseDTO[];
  workouts: WorkoutResponseDTO[];
}

export interface ExerciseResponseDTO {
  id: number;
  info: ExerciseInfoResponseDTO;
  sets: SetResponseDTO[];
}

export interface SetResponseDTO {
  id: number;
  minutesResting: number;
  reps: number;
  weight: number;
  notes: string;
}

export interface ExerciseInfoResponseDTO {
  id: number;
  name: string;
  description: string;
}

export interface CreateWorkoutDTO {
  name: string;
  description: string;
  exercisesDTOS: AddExerciseDTO[];
}

export interface AddExerciseDTO {
  exerciseId: number;
  numberOfSets: number;
  notes: string;
}

export interface PatchSetDTO {
  id: number;
  weight: number;
  reps: number;
  minutesResting: number;
  notes: string;
}

export const useWorkout = () => {
  const showErrorAlert = (error: string) => {
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
  };

  const fetchUserWorkouts = async () => {
    try {
      const response = await api.get("/user/workouts");
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const fetchUserArchievedWorksheets = async () => {
    try {
      const response = await api.get("/user/archived_worksheets");
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const fetchWorkoutById = async (id: string) => {
    try {
      const response = await api.get(`/workout/${id}`);
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const addWorkoutTemplate = async (data: CreateWorkoutDTO) => {
    try {
      const response = await api.post("/worksheet/add", data);
      Swal.fire({
        title: "Success",
        text: response.data.message, // Supondo que o backend retorne uma mensagem de sucesso
        icon: "success",
      });
    } catch (error: any) {
      console.log(error);
      showErrorAlert(error.response.data);
    }
  };

  const startWorkout = async (id: number) => {
    try {
      const response = await api.post(`/workout/start/${id}`);
      const pushToWorkout = () => {
        Router.push(`/workout/${id}`)
      }
      setTimeout(pushToWorkout, 5000)
    } catch (error: any) {
      showErrorAlert(error.message);
    }
  };

  const updatedSets = async (data: PatchSetDTO[]) => {
    try {
      await api.patch("/set/update", data);
    } catch (error: any) {
      showErrorAlert(error.message);
    }
  };

  const fetchWorksheetById = async (id: string) => {
    try {
      const response = await api.get(`/worksheet/${id}`);
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const archiveWorkout = async (id: number) => {
    try {
      const response = await api.patch(`/worksheet/archive/${id}`);
      Router.push("/my-workouts");
      Swal.fire({
        title: "Archived!",
        text: "Your worksheet has been archived.",
        icon: "success",
      });
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const unarchiveWorkout = async (id: number) => {
    try {
      const response = await api.patch(`/worksheet/unarchive/${id}`);
      Router.push("/my-workouts");
      Swal.fire({
        title: "Unarchived!",
        text: "Your file has been unarchived.",
        icon: "success",
      });
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const deleteWorkout = async (id: string) => {
    try {
      const response = await api.delete(`/workout/delete/${id}`);
      Router.push("/my-workouts");
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  return {
    fetchUserWorkouts,
    addWorkoutTemplate,
    startWorkout,
    fetchWorkoutById,
    fetchWorksheetById,
    updatedSets,
    archiveWorkout,
    deleteWorkout,
    unarchiveWorkout,
    fetchUserArchievedWorksheets,
  };
};
