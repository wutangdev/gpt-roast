import React, { useRef, useEffect } from "react";

interface CameraModalProps {
  onClose: () => void;
  onCapture: (imageBlob: Blob) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let stream: MediaStream | null = null;

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 640, 480);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
          } else {
            console.error("Failed to capture image.");
          }
        }, "image/jpeg", 0.8);
      }
    }
  };

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative">
        <h2 className="text-xl font-bold mb-4">Take a Selfie</h2>
        <video ref={videoRef} width="640" height="480" autoPlay />
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
        <div className="mt-4 space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={captureImage}>
            Capture
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
