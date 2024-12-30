import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios"; // Import axios
import { useAuth } from "./context/UserContext";

const Incidents = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();
  const { userMail } = useAuth();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchIncidents = async () => {
      try {
        // console.log(userMail);
        const response = await axios.get(
          `http://localhost:3500/getProfileDetails/user/video?userEmail=${userMail}`
        ); // Make a GET request to your API endpoint
        setIncidents(response.data.videos);
        // setIncidents(response.data.videos); // Set the incidents state with the fetched data
      } catch (error) {
        console.error("Error fetchin incidents:", error);
      }
    };

    fetchIncidents(); // Call the function to fetch incidents
  }, []); // Ensure the effect runs only once when the component mounts

  const goBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenModal = (incident) => {
    setSelectedIncident(incident);
  };

  const handleCloseModal = () => {
    setSelectedIncident(null);
  };

  return (
    <div>
      <div className="bg-gray-100 p-5">
        <h2 className="text-2xl font-semibold mb-6">Recent Incidents</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {incidents.map((incident, index) => (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1"
              onClick={() => handleOpenModal(incident)}
            >
              <video
                controls
                src={`http://localhost:3500/videos/${incident}`}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        {selectedIncident && (
          <Modal
            isOpen={Boolean(selectedIncident)}
            handleClose={handleCloseModal}
            content={{ src: selectedIncident }}
          />
        )}
        <button
          className="mb-4 text-indigo-600 hover:text-indigo-800"
          onClick={goBackToDashboard}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Incidents;
