import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // ✅ Import useAuth

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const { user } = useAuth(); // ✅ Get the logged-in user

  // ... (fetchProjects and useEffect remain the same)
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCloseModal = (e) => {
    if (e.target.id === "modalOverlay") {
      setSelectedProject(null);
    }
  };

  // ✅ NEW FUNCTION: Handle sending the join request
  const handleJoinRequest = async (project) => {
    if (!user) {
      alert("Please log in to join a project.");
      return;
    }

    // Prevent users from joining their own project
    if (user.email === project.authorEmail) {
      alert("You cannot join a project you created.");
      return;
    }

    const payload = {
      projectTitle: project.title,
      authorEmail: project.authorEmail, // The project creator's email
      joinerName: user.name, // The current user's name
      joinerEmail: user.email, // The current user's email
    };

    try {
      await axios.post("http://localhost:5000/api/join-request", payload);
      alert("Your request to join has been sent to the project creator!");
      setSelectedProject(null); // Close modal on success
    } catch (error) {
      console.error("Failed to send join request:", error);
      alert("Failed to send join request. Please try again later.");
    }
  };

  // ... (loading state JSX)
  if (loading) {
    return <p className="text-center mt-6">Loading projects...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto relative px-4">
      {/* ... (h1 title) */}
      <h1
        className="text-4xl font-bold text-center mt-6 mb-10 bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
        }}
      >
        Project List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No projects found
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="p-6 bg-white/40 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform cursor-pointer relative"
              onClick={() => setSelectedProject(project)}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h2>
              {/* Added author name */}
              <p className="text-xs text-gray-500 mb-2">
                by {project.authorName}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {project.description}
              </p>
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {project.category}
                </p>
                <p>
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {project.skills?.join(", ")}
                </p>
              </div>
              <button
                className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full hover:opacity-90 text-sm shadow-md"
                // ✅ UPDATE ONCLICK
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  handleJoinRequest(project);
                }}
              >
                Join
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          onClick={handleCloseModal}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-xs text-gray-500 mb-2">
              by {selectedProject.authorName}
            </p>
            <p className="text-gray-700 mb-2">{selectedProject.description}</p>
            <div className="text-gray-800 text-sm space-y-1 mb-4">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {selectedProject.category}
              </p>
              <p>
                <span className="font-medium">Deadline:</span>{" "}
                {new Date(selectedProject.deadline).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Skills:</span>{" "}
                {selectedProject.skills?.join(", ")}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                // ✅ UPDATE ONCLICK
                onClick={() => handleJoinRequest(selectedProject)}
              >
                Join Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
