import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaCode,
  FaProjectDiagram,
} from "react-icons/fa";

// A large, representative list of skills for the searchable dropdown.
const ALL_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Java",
  "Spring",
  "C++",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Swift",
  "Kotlin",
  "MongoDB",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "Jira",
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "UI/UX Design",
  "Product Management",
  "Scrum",
  "Agile",
  "Public Speaking",
  "Teamwork",
  "Problem-Solving",
  "Communication",
  "Leadership",
  "Data Analysis",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Blockchain",
];

const ProfileSetup = () => {
  // Form data state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    careerSummary: "",
    workExperience: [{ company: "", role: "", duration: "" }],
    projects: [{ name: "", description: "", link: "" }],
    skills: [],
  });

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(
    "Let's build your amazing profile!"
  );
  const [statusColor, setStatusColor] = useState("text-slate-500");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");

  // Handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handlers for dynamic sections (Work Experience)
  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkExperience = [...profile.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [name]: value };
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperience: newWorkExperience,
    }));
  };

  const addWorkExperience = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperience: [
        ...prevProfile.workExperience,
        { company: "", role: "", duration: "" },
      ],
    }));
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = profile.workExperience.filter(
      (_, i) => i !== index
    );
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperience: newWorkExperience,
    }));
  };

  // Handlers for dynamic sections (Projects)
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...profile.projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    setProfile((prevProfile) => ({ ...prevProfile, projects: newProjects }));
  };

  const addProject = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      projects: [
        ...prevProfile.projects,
        { name: "", description: "", link: "" },
      ],
    }));
  };

  const removeProject = (index) => {
    const newProjects = profile.projects.filter((_, i) => i !== index);
    setProfile((prevProfile) => ({ ...prevProfile, projects: newProjects }));
  };

  const navigate = useNavigate();

  // Handlers for Skills dropdown
  const handleSelectSkill = (skill) => {
    if (!profile.skills.includes(skill)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        skills: [...prevProfile.skills, skill],
      }));
      setSkillSearchQuery("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((s) => s !== skill),
    }));
  };

  const filteredSkills = ALL_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
      !profile.skills.includes(skill)
  );

  // In your ProfileSetup component's handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (existing validation code)

    setIsSaving(true);
    setSaveStatus("Saving profile...");
    setStatusColor("text-gray-600");

    try {
      const res = await axios.post("http://localhost:5000/submit", profile);
      console.log("Response:", res.data);
      setSaveStatus("Profile saved successfully! 🎉");
      setStatusColor("text-green-500");

      // Get the user's email from the form's state
      const userEmail = profile.email;

      // Navigate to the dashboard, passing the email in the state
      navigate("/dashboard", { state: { email: userEmail } });
    } catch (err) {
      // ... (error handling)
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">CollabGrow</h1>
          <div className="space-x-4">
            <Link
              to="/signin"
              className="text-gray-600 text-m hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-m text-white w-30 bg-blue-600 rounded-xl p-2 hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 to-pink-100 font-sans flex items-center justify-center text-gray-900">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
          body { font-family: 'Quicksand', sans-serif; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .glassmorphic-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
            animation: fadeInUp 0.8s ease-out;
          }
          .input-field {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 1);
            transition: all 0.3s ease;
          }
          .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.3);
            border-color: #a5b4fc;
          }
          .icon-input-container {
            position: relative;
          }
          .icon-input-container .input-field {
            padding-left: 40px;
          }
          .icon-input-container .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
          }
          .scrollable-list {
            max-height: 200px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #c084fc #f3e8ff;
          }
          .scrollable-list::-webkit-scrollbar {
            width: 8px;
          }
          .scrollable-list::-webkit-scrollbar-track {
            background: #f3e8ff;
            border-radius: 10px;
          }
          .scrollable-list::-webkit-scrollbar-thumb {
            background-color: #c084fc;
            border-radius: 10px;
            border: 2px solid #f3e8ff;
          }
        `}</style>
        <div className="w-full max-w-4xl p-10 rounded-3xl glassmorphic-card">
          <h1 className="text-4xl font-bold text-center mb-2 text-slate-800">
            Build Your Profile ✨
          </h1>
          <p className={`text-center mb-8 ${statusColor}`}>{saveStatus}</p>

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            className="space-y-8"
          >
            {/* Career Summary and Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="icon-input-container">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                    required
                  />
                  <FaUser className="input-icon" />
                </div>
                <div>
                  <label
                    htmlFor="careerSummary"
                    className="block text-sm font-medium mb-1"
                  >
                    Career Summary
                  </label>
                  <textarea
                    id="careerSummary"
                    name="careerSummary"
                    value={profile.careerSummary}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Briefly describe your goals and aspirations..."
                    className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                  ></textarea>
                </div>
              </div>
              <div className="space-y-6">
                <div className="icon-input-container">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                    required
                  />
                  <FaEnvelope className="input-icon" />
                </div>
                <div className="icon-input-container">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium mb-1"
                  >
                    LinkedIn Profile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                    required
                  />
                  <FaLinkedin className="input-icon" />
                </div>
                <div className="icon-input-container">
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium mb-1"
                  >
                    GitHub Profile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={profile.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                    required
                  />
                  <FaGithub className="input-icon" />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="p-6 rounded-3xl glassmorphic-card">
              <div className="flex items-center gap-2 mb-4 text-slate-800">
                <FaCode className="text-2xl" />
                <h2 className="text-2xl font-semibold">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center px-4 py-2 bg-purple-200 text-purple-800 rounded-full text-sm font-medium whitespace-nowrap transition-transform transform hover:scale-105"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-purple-600 hover:text-purple-900 transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <label
                  htmlFor="skillSearch"
                  className="block text-sm font-medium mb-1"
                >
                  Search & Select Skills
                </label>
                <input
                  type="text"
                  id="skillSearch"
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  placeholder="e.g., Python, React, Teamwork"
                  className="w-full px-4 py-3 rounded-2xl input-field text-gray-900 placeholder-gray-400"
                />
                {skillSearchQuery && (
                  <div className="absolute z-10 w-full mt-2 p-2 rounded-2xl glassmorphic-card scrollable-list border border-gray-200">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill) => (
                        <div
                          key={skill}
                          onClick={() => handleSelectSkill(skill)}
                          className="px-3 py-2 cursor-pointer hover:bg-purple-50 rounded-xl transition-colors"
                        >
                          {skill}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center text-sm p-2">
                        No skills found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Work Experience Section */}
            <div className="p-6 rounded-3xl glassmorphic-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <FaBriefcase className="text-2xl" />
                  <h2 className="text-2xl font-semibold">Work Experience</h2>
                </div>
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white text-3xl font-bold"
                >
                  +
                </button>
              </div>
              <div className="space-y-6">
                {profile.workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl glassmorphic-card-inner"
                  >
                    <div className="flex-1 space-y-4 w-full">
                      <input
                        type="text"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        placeholder="Company Name"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      />
                      <input
                        type="text"
                        name="role"
                        value={exp.role}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        placeholder="Role"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      />
                      <input
                        type="text"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleWorkExperienceChange(index, e)}
                        placeholder="Duration (e.g., Jan 2022 - Present)"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="mt-2 md:mt-0 px-6 py-2 bg-pink-500 hover:bg-pink-600 transition-colors rounded-xl font-medium text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Projects Section */}
            <div className="p-6 rounded-3xl glassmorphic-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <FaProjectDiagram className="text-2xl" />
                  <h2 className="text-2xl font-semibold">Projects</h2>
                </div>
                <button
                  type="button"
                  onClick={addProject}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white text-3xl font-bold"
                >
                  +
                </button>
              </div>
              <div className="space-y-6">
                {profile.projects.map((proj, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl glassmorphic-card-inner"
                  >
                    <div className="flex-1 space-y-4 w-full">
                      <input
                        type="text"
                        name="name"
                        value={proj.name}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Project Name"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      />
                      <textarea
                        name="description"
                        value={proj.description}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Project Description"
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      ></textarea>
                      <input
                        type="url"
                        name="link"
                        value={proj.link}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Project Link (Optional)"
                        className="w-full px-4 py-3 rounded-xl input-field text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="mt-2 md:mt-0 px-6 py-2 bg-pink-500 hover:bg-pink-600 transition-colors rounded-xl font-medium text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full max-w-sm py-4 rounded-full font-bold transition-all text-white transform hover:scale-105
                            ${
                              isSaving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-400 to-violet-500 hover:from-blue-500 hover:to-violet-600"
                            }`}
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileSetup;
