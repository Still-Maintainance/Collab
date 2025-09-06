import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Component for the student profile form
const ProfileUpdation = () => {
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
    "Fill out the form to create your profile."
  );
  const [statusColor, setStatusColor] = useState("text-gray-600");
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
    newWorkExperience[index] = {
      ...newWorkExperience[index],
      [name]: value,
    };
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
    newProjects[index] = {
      ...newProjects[index],
      [name]: value,
    };
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !profile.name ||
      !profile.email ||
      !profile.linkedin ||
      !profile.github
    ) {
      setSaveStatus(
        "Please fill out all required fields: Name, Email, LinkedIn, and GitHub."
      );
      setStatusColor("text-red-500");
      return;
    }

    setIsSaving(true);
    setSaveStatus("Saving profile...");
    setStatusColor("text-gray-600");

    try {
      const res = await axios.post("http://localhost:5000/submit", profile);
      console.log("Response:", res.data);
      setSaveStatus("Profile saved successfully!");
      setStatusColor("text-green-500");
    } catch (err) {
      console.error("Error:", err);
      setSaveStatus("Something went wrong!");
      setStatusColor("text-red-500");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 to-slate-200 font-[Poppins] flex items-center justify-center text-gray-900">
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                
                body {
                    font-family: 'Poppins', sans-serif;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .glassmorphic-card {
                    background: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.7);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
                    animation: fadeInUp 0.8s ease-out;
                }
                .input-field {
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                }
                .input-field:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
                }
                .scrollable-list {
                    max-height: 200px;
                    overflow-y: auto;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollable-list::-webkit-scrollbar {
                    display: none;
                }
                `}
      </style>
      <div className="w-full max-w-4xl p-8 rounded-2xl glassmorphic-card">
        <h1 className="text-4xl font-bold text-center mb-2">
          Build Your Profile
        </h1>
        <p className={`text-center mb-8 ${statusColor}`}>{saveStatus}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Career Summary and Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
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
                  className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                  required
                />
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
                  className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                ></textarea>
              </div>
              <div>
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
                  className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
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
                  className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <div>
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
                  className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-6 rounded-xl glassmorphic-card">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div>
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
                className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
              />
            </div>
            {skillSearchQuery && (
              <div className="mt-2 p-2 rounded-xl glassmorphic-card scrollable-list">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => handleSelectSkill(skill)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center text-sm">
                    No skills found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Work Experience Section */}
          <div className="p-6 rounded-xl glassmorphic-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              <button
                type="button"
                onClick={addWorkExperience}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
            <div className="space-y-6">
              {profile.workExperience.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl glassmorphic-card"
                >
                  <div className="flex-1 space-y-4 w-full">
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      placeholder="Company Name"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    />
                    <input
                      type="text"
                      name="role"
                      value={exp.role}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      placeholder="Role"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    />
                    <input
                      type="text"
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      placeholder="Duration (e.g., Jan 2022 - Present)"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="mt-2 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded-xl font-medium text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Projects Section */}
          <div className="p-6 rounded-xl glassmorphic-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
            <div className="space-y-6">
              {profile.projects.map((proj, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl glassmorphic-card"
                >
                  <div className="flex-1 space-y-4 w-full">
                    <input
                      type="text"
                      name="name"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Project Name"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    />
                    <textarea
                      name="description"
                      value={proj.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Project Description"
                      rows="3"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    ></textarea>
                    <input
                      type="url"
                      name="link"
                      value={proj.link}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Project Link (Optional)"
                      className="w-full px-4 py-2 rounded-xl input-field text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="mt-2 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded-xl font-medium text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full max-w-sm py-3 rounded-full font-bold transition-all text-white
                            ${
                              isSaving
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                            }`}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdation;
