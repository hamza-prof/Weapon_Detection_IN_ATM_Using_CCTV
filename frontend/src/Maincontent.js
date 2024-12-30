// MainContent.js
import React from "react";
import Card from "./Card";
import { useAuth } from "./context/UserContext";

const MainContent = () => {
  const { setIsWebcamHidden } = useAuth();

  return (
    <div className="flex-grow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Go Live"
          description="Stream Online"
          color="blue"
          onClick={() => setIsWebcamHidden(false)}
        />
        <Card
          title="Update Profile"
          description="changes saved"
          color="indigo"
          navigateTo="/profile"
        />
        <Card
          title="Watch Previous Incidents"
          description="Videos"
          color="purple"
          navigateTo="/incidents"
        />
      </div>
    </div>
  );
};

export default MainContent;
