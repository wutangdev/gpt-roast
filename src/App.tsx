import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/Welcome';
import ImagePreview from './components/ImagePreview';
import RoastDisplay from './components/RoastDisplay';
import { generateRoast } from './api';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [roastText, setRoastText] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setStep(1);
  };

  const handleImageSubmit = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      if (reader.result) {
        try {
          const roast = await generateRoast(reader.result as string, 'openai-api-key');
          setRoastText(roast);
          setStep(2);
        } catch (error) {
          console.error('Error generating roast:', error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="App">
      {step === 0 && <WelcomeScreen onImageSelect={handleImageSelect} />}
      {step === 1 && selectedImage && (
        <ImagePreview
          selectedImage={selectedImage}
          onConfirm={() => handleImageSubmit(selectedImage)}
          onReset={() => {
            setSelectedImage(null);
            setStep(0);
          }}
        />
      )}
      {step === 2 && (
        <RoastDisplay
          roastText={roastText}
          onReset={() => {
            setStep(0);
            setSelectedImage(null);
            setRoastText(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
