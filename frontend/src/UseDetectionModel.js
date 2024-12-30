import { useState, useEffect, useRef } from "react";
import { Webcam } from "./utils/detection/webcam";
import { detectVideo, onLoadedData } from "./utils/detection/detect";
import { useAuth } from "./context/UserContext";

export default function UseDetectionModel() {
  const [isModelLoading, setIsModelLoading] = useState(false); // No need to track model loading progress now
  const [streaming, setStreaming] = useState();
  const webcam = new Webcam();

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const { userMail } = useAuth();

  const classThreshold = 0.25;

  function startDetection() {
    detectVideo(
      cameraRef.current,
      classThreshold,
      canvasRef.current,
      () => console.log("Weapon Detected!") // Notification callback
    );
  }

  useEffect(() => {
    // Open webcam stream and initialize detection
    webcam.open(cameraRef.current, (stream) => {
      setStreaming(stream);
      onLoadedData(stream, userMail); // Initializes media recorder
    });
  }, []);

  return {
    cameraRef,
    canvasRef,
    isModelLoading,
    streaming,
    startDetection,
  };
}
