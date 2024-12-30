import { renderBoxes } from "./renderBox";

/**
 * Helper function to capture a frame from the video element and convert it to base64.
 */
function captureImage(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg").split(",")[1]; // Return only the base64 part
}

let startRecording = false;
let recordingTimeout;
let mediaRecorder;
let recordedChunks = [];
let recordingStartTime;
let userEmail;

function stopRecording() {
  startRecording = false;
  if (mediaRecorder) {
    try {
      console.log("Stop Recording");
      mediaRecorder.stop();
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  }
}

function startRecordingTimeout() {
  recordingStartTime = Date.now();
  recordingTimeout = setTimeout(stopRecording, 5000);
}

function cancelRecordingTimeout() {
  clearTimeout(recordingTimeout);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

function startRecordingVideo() {
  if (mediaRecorder) {
    mediaRecorder.start();
    console.log("Recording started");
  } else {
    console.error("MediaRecorder is not initialized");
  }
}

/**
 * Function to send the image to the Colab server and receive detections.
 * @param {HTMLImageElement|HTMLVideoElement} source - Image or video source
 * @param {Number} classThreshold - Detection threshold
 * @param {HTMLCanvasElement} canvasRef - Reference to canvas for rendering
 * @param {Function} onDetect - Callback function triggered when weapon is detected
 */
async function runModelOnColab(source, classThreshold, canvasRef, onDetect) {
  const base64Image = captureImage(source);

  // Calculate ratios based on source dimensions relative to the model input size (640x640)
  const xRatio = canvasRef.width / source.videoWidth;
  const yRatio = canvasRef.height / source.videoHeight;

  try {
    const response = await fetch(
      "https://0e8c-35-243-186-21.ngrok-free.app/detect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      }
    );

    const data = await response.json();
    const { detections } = data;

    const boxes_data = [];
    const scores_data = [];
    const classes_data = [];
    let weaponDetected = false;

    // Extract and process detection results
    detections.forEach((det) => {
      const [x1, y1, x2, y2] = det.bbox;
      const confidence = det.score[0];
      const classId = det.label[0];

      if (confidence > classThreshold) {
        weaponDetected = true;
        boxes_data.push(x1, y1, x2, y2);
        scores_data.push(confidence);
        classes_data.push(classId);
      }
    });

    // Render boxes on the canvas with calculated xRatio and yRatio
    renderBoxes(
      canvasRef,
      classThreshold,
      boxes_data,
      scores_data,
      classes_data,
      [xRatio, yRatio]
    );

    // Trigger detection callback if a weapon is detected
    if (weaponDetected) {
      startRecording = true;
      cancelRecordingTimeout();
      startRecordingTimeout();
      if (mediaRecorder.state === "inactive") startRecordingVideo();
      onDetect();
    }
  } catch (error) {
    console.error("Error during model execution on Colab:", error);
  }
}

/**
 * Wrapper function for video detection
 */
export const detectVideo = (vidSource, classThreshold, canvasRef, onDetect) => {
  if (!canvasRef) {
    console.error("Canvas reference is not provided.");
    return;
  }

  if (typeof MediaRecorder === "undefined") {
    console.error("MediaRecorder is not supported in this environment.");
    return;
  }

  const detectFrame = async () => {
    if (vidSource?.videoWidth === 0 && vidSource?.srcObject === null) {
      const ctx = canvasRef.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;
    }

    await runModelOnColab(vidSource, classThreshold, canvasRef, onDetect);

    requestAnimationFrame(detectFrame);
  };

  detectFrame();
};

export const onLoadedData = (stream, email) => {
  mediaRecorder = new MediaRecorder(stream);
  userEmail = email;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const formData = new FormData();
    formData.append("video", blob, "detection_video.webm");
    formData.append("userMail", userEmail);

    fetch("http://localhost:3500/getProfileDetails/user/video", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload video");
        }
        console.log("Video uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
    recordedChunks = [];
  };
};
