import React from 'react';

interface ImagePreviewProps {
  selectedImage: File;
  onConfirm: () => void;
  onReset: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage, onConfirm, onReset }) => {
  const imageUrl = URL.createObjectURL(selectedImage);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Image Preview</h1>
      <img src={imageUrl} alt="Selected" className="max-w-full max-h-96" />
      <div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded mr-4" onClick={onConfirm}>
          Confirm
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
