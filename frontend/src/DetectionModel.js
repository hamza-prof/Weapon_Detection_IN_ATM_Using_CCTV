import React, { useState, useRef, useEffect } from "react";
import { detectVideo, onLoadedData } from "./utils/detection/detect";
import { Webcam } from "./utils/detection/webcam";
import "./DetectionModel.css";
import { useAuth } from "./context/UserContext";
import { toast } from "react-toastify";

export default function ModelLoader() {
  const { isWebcamHidden, setIsWebcamHidden } = useAuth();
  const [isModelLoading, setIsModelLoading] = useState(false); // No need to track model loading progress now
  const [streaming, setStreaming] = useState();
  const webcam = new Webcam();

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const { userMail } = useAuth();

  // Configuration for detection
  const classThreshold = 0.25;

  // Start webcam and detection
  async function handleStartWebcam() {
    if (streaming) {
      webcam.close(cameraRef.current);
      cameraRef.current.style.display = "none";
      setStreaming(null);
      return;
    }
    webcam.open(cameraRef.current, (stream) => onLoadedData(stream, userMail));
    cameraRef.current.style.display = "block";
    setStreaming("camera");
  }

  useEffect(() => {
    setTimeout(handleStartWebcam, 1000); // Delay to start webcam after loading
  }, []);

  return (
    <div
      className={`${
        isWebcamHidden
          ? "opacity-[2%] left-[0%] top-[90%]"
          : "opacity-100 left-0 top-0"
      } absolute z-20 w-screen h-screen flex flex-col items-center justify-center bg-white bg-opacity-50`}
    >
      <div className="bg-gray-50 p-4 w-fit h-fit rounded">
        {isModelLoading ? (
          <div className="flex flex-col items-center justify-normal text-center">
            <h1 className="font-bold">Loading Model</h1>
          </div>
        ) : (
          <div className="detection-model-container">
            <video
              autoPlay
              muted
              ref={cameraRef}
              onPlay={() =>
                detectVideo(
                  cameraRef.current,
                  classThreshold,
                  canvasRef.current,
                  () => {
                    try {
                      console.log("Function Called");
                      toast(
                        `Weapon Detected at ${new Date(Date.now()).toString()}`
                      );
                    } catch (error) {
                      console.error("Error displaying toast:", error);
                    }
                  }
                )
              }
            />
            <canvas
              width={640} // Set canvas width to match model input size
              height={640} // Set canvas height to match model input size
              ref={canvasRef}
            />
          </div>
        )}
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-black py-1 px-3 text-white rounded my-4"
            onClick={() => setIsWebcamHidden(true)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
