import React, { useState, useEffect } from "react";
import { FaSort, FaFilter } from "react-icons/fa";
import "./styles.css";

const DataTable = ({ data, columns }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        columns.some((col) =>
          String(row[col.accessor] || "").toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }, [filterText, data, columns]);

  const handleSort = (accessor) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === accessor && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: accessor, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if ((a[accessor] || "").toString() < (b[accessor] || "").toString()) return direction === "ascending" ? -1 : 1;
      if ((a[accessor] || "").toString() > (b[accessor] || "").toString()) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <FaFilter className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Filter..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="p-3 cursor-pointer"
                onClick={() => handleSort(col.accessor)}
              >
                <div className="flex items-center justify-between">
                  {col.label}
                  <FaSort className="ml-2 text-gray-500" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col.accessor} className="p-3">{row[col.accessor] || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
