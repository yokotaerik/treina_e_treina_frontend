import { CreateWorkoutDTO, PatchSetDTO } from "@/interfaces/interfaces";
import { api } from "@/utils/api";
import Router from "next/router";
import Swal from "sweetalert2";

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
      const { workoutId } = response.data
      Router.push(`/workout/${workoutId}`);
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

  const fetchUserWorkoutsStatsByWorksheetId = async (id: string) => {
    try {
      const response = await api.get(`/user/worksheet/${id}`);
      return response.data;
    } catch (error: any) {
      showErrorAlert(error.response.data);
    }
  };

  const archiveWorkout = async (id: number) => {
    try {
      const response = await api.patch(`/worksheet/archive/${id}`);
      Router.push("/me");
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
      Router.push("/me");
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
      Router.push("/me");
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
    fetchUserWorkoutsStatsByWorksheetId,
  };
};
