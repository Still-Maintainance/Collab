import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../contexts/ProjectContext'
import { ArrowLeft, Plus, X } from 'lucide-react'

const CreatePost = () => {
  const navigate = useNavigate()
  const { addProject } = useProjects()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [],
    deadline: '',
    category: '',
    budget: '',
    timeline: '',
    maxCollaborators: 5
  })
  const [step, setStep] = useState(1)
  const [newSkill, setNewSkill] = useState('')

  const [errors, setErrors] = useState({})
  const [suggestedSkills, setSuggestedSkills] = useState([])

  const availableSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'UI/UX Design',
    'Machine Learning', 'Data Science', 'Mobile Development', 'DevOps',
    'Blockchain', 'Web3', 'Graphic Design', 'Product Management', 'Vue.js',
    'Angular', 'Django', 'Flask', 'Express.js', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Kubernetes', 'Figma', 'Adobe Creative Suite'
  ]

  const categories = [
    'Web App', 'Mobile App', 'Desktop App', 'API', 'Library', 'Plugin',
    'Extension', 'Game', 'Blockchain', 'AI/ML', 'Data Science', 'DevOps',
    'Design', 'Marketing', 'Content', 'Other'
  ]

  const budgetRanges = [
    'No budget',
    '₹0 - ₹10,000',
    '₹10,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000+'
  ]

  const timelineOptions = [
    '1-2 weeks', '1 month', '2-3 months', '3-6 months',
    '6-12 months', '1+ years', 'Ongoing'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Auto-suggest skills based on description
    if (name === 'description') {
      const suggested = availableSkills.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase()) ||
        value.toLowerCase().includes(skill.toLowerCase())
      ).slice(0, 5)
      setSuggestedSkills(suggested)
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill'
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const project = {
      ...formData,
      status: 'Active',
      author: 'John Doe', // In real app, get from auth context
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    }
    
    addProject(project)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              {/* Project Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Enter an engaging project title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`input-field ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Describe your project in detail. What problem does it solve? What are the key features?"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/500 characters (minimum 50)
                </p>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    // Validate only title and description for step 1
                    const newErrors = {};
                    if (!formData.title.trim()) newErrors.title = 'Project title is required';
                    if (!formData.description.trim()) newErrors.description = 'Project description is required';
                    else if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
                    setErrors(newErrors);
                    if (Object.keys(newErrors).length === 0) setStep(2);
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Skills Selection (show only 10 skills) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills *
                </label>
                {/* Selected Skills */}
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

                {/* Show only 10 available skills */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableSkills
                    .filter(skill => !formData.skills.includes(skill))
                    .slice(0, 10)
                    .map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        {skill}
                      </button>
                    ))}
                </div>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                )}
              </div>

              {/* Add Skill Manually */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Custom Skill
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    className="input-field"
                    placeholder="Type a skill and press Add"
                  />
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      if (newSkill && !formData.skills.includes(newSkill)) {
                        handleSkillToggle(newSkill)
                        setNewSkill('')
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`input-field ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    // Validate only skills and category for step 2
                    const newErrors = {};
                    if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill';
                    if (!formData.category) newErrors.category = 'Category is required';
                    setErrors(newErrors);
                    if (Object.keys(newErrors).length === 0) setStep(3);
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="maxCollaborators" className="block text-sm font-medium text-gray-700 mb-2">
                    Max Collaborators
                  </label>
                  <input
                    id="maxCollaborators"
                    name="maxCollaborators"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.maxCollaborators}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline *
                  </label>
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`input-field ${errors.deadline ? 'border-red-300 focus:ring-red-500' : ''}`}
                  />
                  {errors.deadline && (
                    <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((timeline) => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Project
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreatePost