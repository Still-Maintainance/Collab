import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaCode,
  FaProjectDiagram,
  FaCertificate,
  FaTrophy,
  FaLaugh,
  FaLanguage,
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
  const navigate = useNavigate();

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
    certifications: [{ name: "", issuer: "", date: "" }],
    achievements: [{ title: "", description: "" }],
    hobbies: [],
    languages: [],
    date: new Date(),
  });

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(
    "Let's build your amazing profile!"
  );
  const [statusColor, setStatusColor] = useState("text-slate-500");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [hobbyInput, setHobbyInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  // Handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Generic handler for dynamic array sections
  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = [...profile[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    setProfile((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const addDynamicItem = (section, newItem) => {
    setProfile((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeDynamicItem = (section, index) => {
    setProfile((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Handlers for lists (Hobbies and Languages)
  const handleAddItemToList = (e, list, setInput, input) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!profile[list].includes(input.trim())) {
        setProfile((prev) => ({
          ...prev,
          [list]: [...prev[list], input.trim()],
        }));
      }
      setInput("");
    }
  };

  const handleRemoveItemFromList = (list, itemToRemove) => {
    setProfile((prev) => ({
      ...prev,
      [list]: prev[list].filter((item) => item !== itemToRemove),
    }));
  };

  // Handlers for Skills dropdown
  const handleSelectSkill = (skill) => {
    if (!profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSkillSearchQuery("");
    }
  };

  const filteredSkills = ALL_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
      !profile.skills.includes(skill)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !profile.name ||
      !profile.email ||
      !profile.linkedin ||
      !profile.github
    ) {
      setSaveStatus("Please fill out all required fields marked with *");
      setStatusColor("text-red-500");
      return;
    }

    setIsSaving(true);
    setSaveStatus("Saving profile...");
    setStatusColor("text-slate-600");

    try {
      await axios.post("http://localhost:5000/submit", profile);
      setSaveStatus("Profile saved successfully! 🎉");
      setStatusColor("text-green-600");

      setTimeout(() => {
        navigate("/signinafter");
      }, 1500); // Give user time to see success message
    } catch (err) {
      console.error("Error:", err);
      setSaveStatus("Something went wrong!");
      setStatusColor("text-red-500");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-indigo-100 font-sans flex items-center justify-center text-slate-800">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.6); 
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.8s ease-out;
          }
          .input-field {
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(203, 213, 225, 0.7); /* slate-300 */
            transition: all 0.3s ease;
            color: #1e293b; /* slate-800 */
          }
          .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3); /* indigo-600 */
            border-color: #6366f1; /* indigo-500 */
          }
          .input-field::placeholder {
            color: #94a3b8; /* slate-400 */
          }
          .icon-input-container { position: relative; }
          .icon-input-container .input-field { padding-left: 40px; }
          .icon-input-container .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8; /* slate-400 */
          }
          .scrollable-list {
            max-height: 200px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #a5b4fc #eef2ff; /* indigo-300 indigo-50 */
          }
          .scrollable-list::-webkit-scrollbar { width: 6px; }
          .scrollable-list::-webkit-scrollbar-track { background: #eef2ff; border-radius: 10px; }
          .scrollable-list::-webkit-scrollbar-thumb { background-color: #a5b4fc; border-radius: 10px; }
        `}</style>
        <div className="w-full max-w-5xl p-6 sm:p-10 rounded-3xl glass-card">
          <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Create Your Profile
          </h1>
          <p
            className={`text-center mb-8 transition-colors duration-300 ${statusColor}`}
          >
            {saveStatus}
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="icon-input-container">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-slate-600"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl input-field"
                    required
                  />
                  <FaUser className="input-icon" />
                </div>
                <div>
                  <label
                    htmlFor="careerSummary"
                    className="block text-sm font-medium mb-1 text-slate-600"
                  >
                    Career Summary
                  </label>
                  <textarea
                    id="careerSummary"
                    name="careerSummary"
                    value={profile.careerSummary}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="A brief professional summary..."
                    className="w-full px-4 py-3 rounded-xl input-field"
                  ></textarea>
                </div>
              </div>
              <div className="space-y-6">
                <div className="icon-input-container">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-slate-600"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl input-field"
                    required
                  />
                  <FaEnvelope className="input-icon" />
                </div>
                <div className="icon-input-container">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium mb-1 text-slate-600"
                  >
                    LinkedIn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 rounded-xl input-field"
                    required
                  />
                  <FaLinkedin className="input-icon" />
                </div>
                <div className="icon-input-container">
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium mb-1 text-slate-600"
                  >
                    GitHub <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={profile.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 rounded-xl input-field"
                    required
                  />
                  <FaGithub className="input-icon" />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Section */}
              <div className="p-6 rounded-2xl glass-card space-y-4">
                <div className="flex items-center gap-3 text-indigo-600">
                  <FaCode className="text-2xl" />
                  <h2 className="text-2xl font-semibold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItemFromList("skills", skill)
                        }
                        className="ml-2 text-indigo-500 hover:text-indigo-800"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={skillSearchQuery}
                    onChange={(e) => setSkillSearchQuery(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full px-4 py-2 rounded-lg input-field"
                  />
                  {skillSearchQuery && (
                    <div className="absolute z-10 w-full mt-2 p-2 rounded-xl glass-card scrollable-list border border-slate-200">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill) => (
                          <div
                            key={skill}
                            onClick={() => handleSelectSkill(skill)}
                            className="px-3 py-2 cursor-pointer hover:bg-indigo-100 rounded-lg"
                          >
                            {skill}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 text-center text-sm p-2">
                          No skills found.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hobbies & Languages */}
              <div className="space-y-8">
                {["hobbies", "languages"].map((section) => (
                  <div
                    key={section}
                    className="p-6 rounded-2xl glass-card space-y-3"
                  >
                    <div className="flex items-center gap-3 text-indigo-600">
                      {section === "hobbies" ? (
                        <FaLaugh className="text-xl" />
                      ) : (
                        <FaLanguage className="text-xl" />
                      )}
                      <h2 className="text-xl font-semibold capitalize">
                        {section}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[36px]">
                      {profile[section].map((item) => (
                        <span
                          key={item}
                          className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveItemFromList(section, item)
                            }
                            className="ml-2 text-blue-500 hover:text-blue-800"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={section === "hobbies" ? hobbyInput : languageInput}
                      onChange={(e) =>
                        section === "hobbies"
                          ? setHobbyInput(e.target.value)
                          : setLanguageInput(e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleAddItemToList(
                          e,
                          section,
                          section === "hobbies"
                            ? setHobbyInput
                            : setLanguageInput,
                          section === "hobbies" ? hobbyInput : languageInput
                        )
                      }
                      placeholder={`Add ${section.slice(
                        0,
                        -1
                      )} and press Enter`}
                      className="w-full px-4 py-2 rounded-lg input-field"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Sections */}
            {[
              {
                key: "workExperience",
                title: "Work Experience",
                icon: FaBriefcase,
                fields: [
                  { name: "company", placeholder: "Company" },
                  { name: "role", placeholder: "Role" },
                  { name: "duration", placeholder: "e.g., Jan 2022 - Present" },
                ],
              },
              {
                key: "projects",
                title: "Projects",
                icon: FaProjectDiagram,
                fields: [
                  { name: "name", placeholder: "Project Name" },
                  {
                    name: "description",
                    placeholder: "Description",
                    type: "textarea",
                  },
                  { name: "link", placeholder: "Project Link" },
                ],
              },
              {
                key: "certifications",
                title: "Certifications",
                icon: FaCertificate,
                fields: [
                  { name: "name", placeholder: "Certificate Name" },
                  { name: "issuer", placeholder: "Issuing Body" },
                  { name: "date", placeholder: "Date Issued" },
                ],
              },
              {
                key: "achievements",
                title: "Achievements",
                icon: FaTrophy,
                fields: [
                  { name: "title", placeholder: "Achievement Title" },
                  {
                    name: "description",
                    placeholder: "Description",
                    type: "textarea",
                  },
                ],
              },
            ].map((section) => (
              <div key={section.key} className="p-6 rounded-2xl glass-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <section.icon className="text-2xl" />
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addDynamicItem(
                        section.key,
                        section.fields.reduce(
                          (acc, field) => ({ ...acc, [field.name]: "" }),
                          {}
                        )
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-600 transition text-white text-2xl font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="space-y-6">
                  {profile[section.key].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-xl glass-card"
                    >
                      <div className="flex-1 space-y-4 w-full">
                        {section.fields.map((field) =>
                          field.type === "textarea" ? (
                            <textarea
                              key={field.name}
                              name={field.name}
                              value={item[field.name]}
                              onChange={(e) =>
                                handleDynamicChange(section.key, index, e)
                              }
                              placeholder={field.placeholder}
                              rows="3"
                              className="w-full px-4 py-2 rounded-lg input-field"
                            ></textarea>
                          ) : (
                            <input
                              key={field.name}
                              type="text"
                              name={field.name}
                              value={item[field.name]}
                              onChange={(e) =>
                                handleDynamicChange(section.key, index, e)
                              }
                              placeholder={field.placeholder}
                              className="w-full px-4 py-2 rounded-lg input-field"
                            />
                          )
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDynamicItem(section.key, index)}
                        className="mt-2 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg font-medium text-white text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full max-w-sm py-3 rounded-full font-bold transition-all text-white transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isSaving ? "Saving..." : "Create Profile & Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileSetup;
