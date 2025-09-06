import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Users, Calendar, DollarSign } from 'lucide-react'
import { useProjects } from '../contexts/ProjectContext'

const ProjectCard = ({ project }) => {
  const { likeProject, addComment, requestCollaboration } = useProjects()

  const handleLike = (e) => {
    e.preventDefault()
    likeProject(project.id)
  }

  const handleComment = (e) => {
    e.preventDefault()
    addComment(project.id)
  }

  const handleCollaborate = (e) => {
    e.preventDefault()
    requestCollaboration(project.id)
  }

  return (
    <div className="card group">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-4 right-4">
          <span className={`badge ${
            project.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="skill-tag bg-gray-100 text-gray-600">
              +{project.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(project.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {project.budget}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="h-4 w-4 mr-1" />
              {project.likes}
            </button>
            <button
              onClick={handleComment}
              className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {project.comments}
            </button>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {project.collaborators}/{project.maxCollaborators}
            </div>
          </div>
          <Link
            to={`/project/${project.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard