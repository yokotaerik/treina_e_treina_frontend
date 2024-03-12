import Worksheet from "@/components/card/Worksheet";
import WorksheetList from "@/components/lists/WorksheetList";
import { WorksheetResponseDTO, useWorkout } from "@/hooks/useWorkout";
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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-5xl font-bold text-orange-600 mb-8">Treinos arquivados</h1>
      <div className="flex flex-wrap w-full justify-center gap-5">
        {worksheets.map((worksheet) => {
          return <Worksheet isArchived={true} worksheet={worksheet} />;
        })}
      </div>
    </div>
  );

  // <WorksheetList worksheets={worksheets} isArchived={true}/>;
};

export default ArchivedWorkoutsPage;
