import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import axios from "axios"; // ✅ Import axios

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    deadline: "",
    category: "",
    budget: "",
    timeline: "",
    maxCollaborators: 5,
  });

  const [errors, setErrors] = useState({});
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const availableSkills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "UI/UX Design",
    "Machine Learning",
    "Data Science",
    "Mobile Development",
    "DevOps",
    "Blockchain",
    "Web3",
    "Graphic Design",
    "Product Management",
    "Vue.js",
    "Angular",
    "Django",
    "Flask",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Figma",
    "Adobe Creative Suite",
  ];

  const categories = [
    "Web App",
    "Mobile App",
    "Desktop App",
    "API",
    "Library",
    "Plugin",
    "Extension",
    "Game",
    "Blockchain",
    "AI/ML",
    "Data Science",
    "DevOps",
    "Design",
    "Marketing",
    "Content",
    "Other",
  ];

  const budgetRanges = [
    "No budget",
    "$0 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ];

  const timelineOptions = [
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6-12 months",
    "1+ years",
    "Ongoing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "description") {
      const suggested = availableSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(value.toLowerCase()) ||
            value.toLowerCase().includes(skill.toLowerCase())
        )
        .slice(0, 5);
      setSuggestedSkills(suggested);
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Project title is required";
    if (!formData.description.trim())
      newErrors.description = "Project description is required";
    else if (formData.description.length < 50)
      newErrors.description = "Description must be at least 50 characters";
    if (formData.skills.length === 0)
      newErrors.skills = "Please select at least one skill";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);

  const project = {
    ...formData,
    
  };

  try {
    const res = await axios.post("http://localhost:5000/api/posts", project);

    if (res.status === 200 || res.status === 201) {
      alert("Project created successfully!");
       navigate("/dashboard");
      
      // Reset form after success
      setFormData({
        title: "",
        description: "",
        skills: [],
        deadline: "",
        category: "",
        timeline: "",
        maxCollaborators: 5,
      });
    } else {
      alert("Failed to create project!");
    }
  } catch (err) {
    alert("Failed to create project!");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
      </div>

      {/* Feedback Messages */}
      {feedback && (
        <div
          className={`p-3 mb-4 rounded ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? "border-red-300" : ""}`}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`input-field ${
                errors.description ? "border-red-300" : ""
              }`}
              placeholder="Describe your project"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/500 characters (min 50)
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Suggested Skills */}
          {suggestedSkills.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggested Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                  >
                    <Plus className="h-3 w-3 inline mr-1" />
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *
            </label>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill) => (
                  <span key={skill} className="skill-tag group">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableSkills
                .filter((skill) => !formData.skills.includes(skill))
                .map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                  >
                    {skill}
                  </button>
                ))}
            </div>
            {errors.skills && (
              <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input-field ${
                  errors.category ? "border-red-300" : ""
                }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`input-field ${
                  errors.deadline ? "border-red-300" : ""
                }`}
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Collaborators
              </label>
              <input
                type="number"
                name="maxCollaborators"
                min="1"
                max="20"
                value={formData.maxCollaborators}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
