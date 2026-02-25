import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Welcome = () => {
  const navigate = useNavigate();
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadWelcomeImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/welcome-images`);
        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            // Create full URLs for all images
            const imageUrls = data.images.map((img: string) => `${API_URL}${img}`);
            
            // Shuffle array to randomize order
            const shuffled = [...imageUrls].sort(() => Math.random() - 0.5);
            setBackgroundImages(shuffled);
          }
        }
      } catch (error) {
        console.error("Error loading welcome images:", error);
      }
    };

    loadWelcomeImages();
  }, []);

  // Change image every 2 seconds with zoom effect
  useEffect(() => {
    if (backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  const currentImage = backgroundImages[currentImageIndex];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with blur and zoom effect */}
      {currentImage && (
        <>
          <img 
            key={currentImageIndex}
            src={currentImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover animate-subtle-zoom"
          />
          {/* Blur and darken overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <h1 className="font-display text-5xl md:text-7xl text-white drop-shadow-2xl animate-fade-in">
          Photobook de nuestra historia
        </h1>
        <button
          onClick={() => navigate("/menu")}
          className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-body text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Ver photobook
        </button>
      </div>
    </div>
  );
};

export default Welcome;
