import React from "react";

interface RoastDisplayProps {
  roastText: string | null;
  onReset: () => void;
}

const RoastDisplay: React.FC<RoastDisplayProps> = ({ roastText, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Your Roast</h1>
      <p className="text-xl text-center">{roastText}</p>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded" onClick={onReset}>
        Try Another
      </button>
    </div>
  );
};

export default RoastDisplay;
