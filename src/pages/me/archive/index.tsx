import Worksheet from "@/components/card/Worksheet";
import { useWorkout } from "@/hooks/useWorkout";
import { WorksheetResponseDTO } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const ArchivedWorkoutsPage = () => {
  const [worksheets, setWorksheets] = useState<WorksheetResponseDTO[]>([]);
  const { fetchUserArchievedWorksheets } = useWorkout();

  useEffect(() => {
    const fetchData = async () => {
      const worksheetsData = await fetchUserArchievedWorksheets();
      setWorksheets(worksheetsData);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-slate-800 mb-8">
        Treinos arquivados
      </h1>
      <div className="flex flex-wrap w-full justify-center gap-5">
        {worksheets.map((worksheet) => {
          return <Worksheet isArchived={true} worksheet={worksheet} />;
        })}
      </div>
    </div>
  );
};

export default ArchivedWorkoutsPage;
