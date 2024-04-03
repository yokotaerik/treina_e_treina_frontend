import { useWorkout } from "@/hooks/useWorkout";
import { WorksheetResponseDTO } from "@/interfaces/interfaces";
import Link from "next/link";
import { useState } from "react";

interface WorksheetProps {
  worksheet: WorksheetResponseDTO;
  handleStart?: (id: number) => void;
  isArchived: boolean;
}

const Worksheet = ({ worksheet, handleStart, isArchived }: WorksheetProps) => {
  const { unarchiveWorkout, archiveWorkout } = useWorkout();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAction = (action: string, id: number) => {
    if (action === "archive") {
      archiveWorkout(id);
    } else if (action === "unarchive") {
      unarchiveWorkout(id);
    }
    setShowDropdown(false);
  };

  return (
    <div className="bg-white shadow-md p-4 lg:w-1/5 w-full md:w-2/4">
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/worksheet/${worksheet.id}`}>
            <h2 className="text-4xl font-semibold cursor-pointer mb-2">
              {worksheet.name}
            </h2>
          </Link>
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="text-xl font-black px-3 py-1 border-gray-300 rounded-md"
            >
              ...
            </button>
            {showDropdown && (
              <ul className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md">
                <li
                  onClick={() =>
                    handleAction(
                      isArchived ? "unarchive" : "archive",
                      worksheet.id
                    )
                  }
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-100"
                >
                  {isArchived ? "Desarquivar" : "Arquivar"}
                </li>
              </ul>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{worksheet.description}</p>
      </div>

      {!isArchived && (
        <button
          className="block w-full bg-slate-500 text-white py-2 mt-4 hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
          onClick={() => handleStart && handleStart(worksheet.id)}
        >
          Iniciar Treino
        </button>
      )}
    </div>
  );
};

export default Worksheet;
