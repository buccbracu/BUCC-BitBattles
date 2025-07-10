"use client";
import { useState } from "react";

export default function DownadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/teams");

      console.log(response);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `teams_export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      setError(err instanceof Error ? err.message : "Failed to export teams");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleExport}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md ${
          isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white transition-colors`}
      >
        {isLoading ? "Exporting..." : "Export to CSV"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
