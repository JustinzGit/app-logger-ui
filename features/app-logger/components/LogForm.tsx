"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AppOption = {
  id: number;
  name: string;
};

const apps: AppOption[] = [
  { id: 1, name: "AppA" },
  { id: 2, name: "AppB" },
  { id: 3, name: "AppC" },
];

export default function LogForm() {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(e.target.selectedOptions).map(
      (o) => o.value
    );
    setSelectedApps(values);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Apps
      </label>

      <div className="relative mt-2">
        <select
          multiple
          value={selectedApps}
          onChange={handleChange}
          className="
            block w-full rounded-md bg-white py-2 pl-3 pr-10
            text-sm text-gray-900
            outline-1 -outline-offset-1 outline-gray-300
            focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600
            dark:bg-white/5 dark:text-white dark:outline-white/10
          "
        >
          {apps.map(app => (
            <option key={app.id} value={app.name}>
              {app.name}
            </option>
          ))}
        </select>

        {/* Decorative dropdown icon */}
        <ExpandMoreIcon
          className="pointer-events-none absolute right-2 top-2.5 text-gray-500 dark:text-gray-400"
          fontSize="small"
        />
      </div>

      <p className="mt-1 text-xs text-gray-500">
        Hold Ctrl / Cmd to select multiple
      </p>
    </div>
  );
}
