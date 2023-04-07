import React, { useState } from "react";
import CameraModal from "./CameraModal";

interface WelcomeScreenProps {
  onImageSelect: (file: File) => void;
}

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onImageSelect }) => {
  const [showCameraModal, setShowCameraModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleCapture = (imageBlob: Blob) => {
    setShowCameraModal(false);
    onImageSelect(new File([imageBlob], "selfie.jpg", { type: "image/jpeg" }));
  };

  const mobileTakeSelfieButton = (
    <label className="bg-indigo-600 text-white px-6 py-2 rounded cursor-pointer">
      <input
        className="hidden"
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
      />
      Take Selfie
    </label>
  );

  const desktopTakeSelfieButton = (
    <button
      className="bg-indigo-600 text-white px-6 py-2 rounded"
      onClick={() => setShowCameraModal(true)}
    >
      Take Selfie
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Roast Me App</h1>
      <p className="text-lg text-center">
        Take a selfie or upload one and get a light-hearted roast from our AI!
      </p>
      <div className="space-x-4">
        {isMobileDevice() ? mobileTakeSelfieButton : desktopTakeSelfieButton}
        <label className="bg-indigo-600 text-white px-6 py-2 rounded cursor-pointer">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          Upload Selfie
        </label>
      </div>
      {showCameraModal && <CameraModal onClose={() => setShowCameraModal(false)} onCapture={handleCapture} />}
    </div>
  );
};

export default WelcomeScreen;
