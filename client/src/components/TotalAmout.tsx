import { useState } from "react";
import dateExtractor from "../utility/DateExtractor";
import { useNavigate } from "react-router-dom";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import DatePicker from "./DatePicker";
import SkeletonItems from "./SkeletonItems";
import { useTransactions } from "../hooks/useTransactions";
import Notify from "./Notify";

const TotalAmount = () => {
  const { combined, setCombined, isLoading, error } = useTransactions();
  const [sort, setSort] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  if (error.length > 0) {
    return (
      showNotification && (
        <Notify onClose={() => setShowNotification(false)} message={error} />
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-2 h-auto">
        <div className="mb-4">
          <DatePicker />
        </div>
        <div className="flex flex-row w-72">
          <label className="text-lg mb-2 font-semibold w-full">
            In total: {calculateTotalAmount(combined)} KM
          </label>
          <div className="w-6">
            <ImportExportIcon
              onClick={() => setCombined(sortData(combined, sort, setSort))}
              className="text-cyan-600/80 dark:text-slate-800 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="container flex flex-col overflow-auto">
        {isLoading ? (
          <SkeletonItems />
        ) : (
          combined.map((resource, key) => {
            return (
              <div className="itemContainer shadow-md" key={key}>
                <div
                  className="item flex justify-center"
                  onClick={() =>
                    navigate(
                      `/${
                        resource.type === "expense" ? "expenses" : "income"
                      }/${resource.id}`
                    )
                  }
                >
                  <div className="titleContainer w-3/5">
                    <div className="itemDate text-sm font-normal text-gray-500">
                      {dateExtractor(new Date(resource.createdAt))}
                    </div>
                    <div className="font-mono mt-1 font-semibold">
                      {resource.title}
                    </div>
                    <div className="itemLocation text-sm font-normal text-gray-500 italic">
                      {resource.location}
                    </div>
                  </div>
                  {resource.type === "expense" ? (
                    <div
                      className={`itemValue w-2/5 font-semibold align-bottom text-red-700`}
                    >
                      -{resource.value} KM
                    </div>
                  ) : (
                    <div
                      className={`itemValue w-2/5 font-semibold align-bottom text-green-700`}
                    >
                      +{resource.value} KM
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TotalAmount;
