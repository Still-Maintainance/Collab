import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null); // For modal

  // ✅ Fetch projects from backend
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

  // ✅ Close modal on outside click
  const handleCloseModal = (e) => {
    if (e.target.id === "modalOverlay") {
      setSelectedProject(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading projects...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      <h1
        className="text-3xl font-bold text-center mt-6 mb-8 bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
        }}
      >
        Project List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No projects found
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="border border-gray-200 rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {project.title}
              </h2>
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1 truncate">
                  {project.description}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Category:</span>{" "}
                  {project.category}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Deadline:</span>{" "}
                  {project.deadline}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Skills:</span>{" "}
                  {project.skills?.join(", ")}
                </p>
              </div>
              <button
                className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Joining project: ${project.title}`);
                }}
              >
                Join
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for expanded project details */}
      {selectedProject && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">{selectedProject.title}</h2>
            <p className="mb-2">{selectedProject.description}</p>
            <p className="mb-1">
              <span className="font-medium">Category:</span>{" "}
              {selectedProject.category}
            </p>
            <p className="mb-1">
              <span className="font-medium">Deadline:</span>{" "}
              {selectedProject.deadline}
            </p>
            <p className="mb-3">
              <span className="font-medium">Skills:</span>{" "}
              {selectedProject.skills?.join(", ")}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
