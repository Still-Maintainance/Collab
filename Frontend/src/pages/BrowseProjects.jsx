import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
// ✅ Imports for animations and icons remain
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Code, User, X } from "lucide-react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const { user } = useAuth();

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

  const handleJoinRequest = async (project) => {
    if (!user) {
      alert("Please log in to join a project.");
      return;
    }

    if (user.email === project.authorEmail) {
      alert("You cannot join a project you created.");
      return;
    }

    const payload = {
      projectTitle: project.title,
      authorEmail: project.authorEmail,
      joinerName: user.name,
      joinerEmail: user.email,
    };

    try {
      await axios.post("http://localhost:5000/api/join-request", payload);
      alert("Your request to join has been sent to the project creator!");
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to send join request:", error);
      alert("Failed to send join request. Please try again later.");
    }
  };

  // ✅ Animation variants, tweaked for a subtler effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-center text-slate-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12">
      <div className="max-w-7xl mx-auto relative px-4">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-bold text-center mt-6 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Explore Projects
        </motion.h1>

        {projects.length === 0 ? (
          <p className="text-center col-span-full text-slate-500 text-lg">
            No projects found. Be the first to create one!
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative bg-white border border-slate-200/80 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold text-slate-900 mb-1">
                    {project.title}
                  </h2>
                  <div className="flex items-center text-xs text-slate-500 mb-4">
                    <User className="w-3 h-3 mr-1.5" />
                    <span>by {project.authorName}</span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex items-center text-sm text-slate-700 mb-3">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Deadline:{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.skills?.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      {project.category}
                    </span>
                    <button
                      className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinRequest(project);
                      }}
                    >
                      Join <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              id="modalOverlay"
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              onClick={handleCloseModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 30, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center text-sm text-slate-500 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span>by {selectedProject.authorName}</span>
                </div>

                <p className="text-slate-700 mb-6">
                  {selectedProject.description}
                </p>

                <div className="space-y-4 text-slate-800 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Deadline</p>
                      <p className="font-medium">
                        {new Date(
                          selectedProject.deadline
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Code className="w-5 h-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Required Skills</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProject.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm font-medium bg-blue-50 text-blue-800 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-medium"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                  <button
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow-sm hover:shadow-md"
                    onClick={() => handleJoinRequest(selectedProject)}
                  >
                    Send Join Request
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectList;