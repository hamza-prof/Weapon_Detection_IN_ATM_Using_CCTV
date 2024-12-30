// Modal.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, handleClose, content }) => {
  if (!isOpen) return null;
  const timeStamp = Number(content.src.split("-")[0]);
  const time = new Date(timeStamp).toTimeString().split(" ")[0];
  const date = new Date(timeStamp).toDateString();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg max-w-4xl h-fit w-fit flex overflow-hidden">
        <div className="w-[100vh] p-4 h-fit">
          <button onClick={handleClose} className="ml-auto">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
          <video
            controls
            src={`http://localhost:3500/videos/${content.src}`}
            className="w-full h-full object-cover"
          ></video>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Date:{" "}
            </span>
            {date}
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Time:{" "}
            </span>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
