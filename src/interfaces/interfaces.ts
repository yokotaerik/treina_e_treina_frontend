export interface WorkoutStatsDTO {
  worksheet: WorksheetResponseDTO
  workouts: WorkoutResponseDTO[];
  heaviestSets: SetResponseDTO[];
  bestSets: SetResponseDTO[];
}

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
  exercise: string;
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
