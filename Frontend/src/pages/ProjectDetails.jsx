import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProjects } from '../contexts/ProjectContext'
import { Heart, MessageCircle, Users, Calendar, DollarSign, ArrowLeft, Share2, Flag } from 'lucide-react'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, likeProject, addComment, requestCollaboration } = useProjects()
  
  const project = projects.find(p => p.id === parseInt(id))
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
        <button
          onClick={() => navigate('/browse-projects')}
          className="btn-primary"
        >
          Back to Projects
        </button>
      </div>
    )
  }

  const handleLike = () => {
    likeProject(project.id)
  }

  const handleComment = () => {
    addComment(project.id)
    setShowComments(true)
  }

  const handleCollaborate = () => {
    requestCollaboration(project.id)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      addComment(project.id)
      setNewComment('')
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/browse-projects')}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Projects
      </button>

      {/* Project Header */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Project Image */}
          <div className="lg:w-1/3">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Project Info */}
          <div className="lg:w-2/3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className={`badge ${
                    project.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Flag className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Project Stats */}
            <div className="flex items-center space-x-6 mb-6">
              <button
                onClick={handleLike}
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart className="h-5 w-5 mr-2" />
                {project.likes} likes
              </button>
              <button
                onClick={handleComment}
                className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {project.comments} comments
              </button>
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                {project.collaborators}/{project.maxCollaborators} collaborators
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCollaborate}
                className="btn-primary flex-1"
                disabled={project.collaborators >= project.maxCollaborators}
              >
                <Users className="h-5 w-5 mr-2" />
                {project.collaborators >= project.maxCollaborators ? 'Project Full' : 'Request Collaboration'}
              </button>
              <button
                onClick={() => navigate(`/collaboration/${project.id}`)}
                className="btn-outline flex-1"
              >
                View Collaboration Space
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Deadline</div>
                  <div className="text-gray-600">{new Date(project.deadline).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Budget</div>
                  <div className="text-gray-600">{project.budget}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Timeline</div>
                  <div className="text-gray-600">{project.timeline}</div>
                </div>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Category</div>
                  <div className="text-gray-600">{project.category}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {showComments ? 'Hide' : 'Show'} Comments
              </button>
            </div>

            {showComments && (
              <div className="space-y-4">
                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="flex space-x-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {/* Mock comments */}
                  <div className="flex space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                      alt="Sarah"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Sarah Johnson</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-gray-700">This looks like an amazing project! I'd love to contribute to the frontend development.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      alt="Mike"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Mike Chen</span>
                          <span className="text-sm text-gray-500">4 hours ago</span>
                        </div>
                        <p className="text-gray-700">Great concept! I have experience with the tech stack you're using. Count me in!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Info */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Project Author</h3>
            <div className="flex items-center space-x-3">
              <img
                src={project.authorAvatar}
                alt={project.author}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{project.author}</div>
                <div className="text-sm text-gray-600">Project Creator</div>
              </div>
            </div>
          </div>

          {/* Collaboration Status */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Collaboration Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Available Spots</span>
                <span className="font-medium">{project.maxCollaborators - project.collaborators}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(project.collaborators / project.maxCollaborators) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {project.collaborators} of {project.maxCollaborators} spots filled
              </p>
            </div>
          </div>

          {/* Similar Projects */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Similar Projects</h3>
            <div className="space-y-3">
              {projects
                .filter(p => p.id !== project.id && p.category === project.category)
                .slice(0, 3)
                .map((similarProject) => (
                  <div key={similarProject.id} className="flex space-x-3">
                    <img
                      src={similarProject.image}
                      alt={similarProject.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {similarProject.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {similarProject.collaborators}/{similarProject.maxCollaborators} collaborators
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails