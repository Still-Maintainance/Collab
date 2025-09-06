import React, { createContext, useContext, useState } from 'react'

const ProjectContext = createContext()

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Eco-Friendly Shopping App',
      description: 'A mobile application that helps users find and purchase eco-friendly products from local stores. Features include carbon footprint tracking, store locator, and community reviews.',
      skills: ['React Native', 'Node.js', 'MongoDB', 'UI/UX Design'],
      deadline: '2024-03-15',
      status: 'Active',
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      likes: 24,
      comments: 8,
      collaborators: 3,
      maxCollaborators: 5,
      createdAt: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'Mobile App',
      budget: '$5,000 - $10,000',
      timeline: '3-6 months'
    },
    {
      id: 2,
      title: 'AI-Powered Learning Platform',
      description: 'An intelligent learning management system that adapts to individual learning styles and provides personalized content recommendations.',
      skills: ['Python', 'Machine Learning', 'React', 'PostgreSQL'],
      deadline: '2024-04-20',
      status: 'Active',
      author: 'Mike Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      likes: 42,
      comments: 15,
      collaborators: 4,
      maxCollaborators: 6,
      createdAt: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      category: 'Web App',
      budget: '$10,000 - $20,000',
      timeline: '6-12 months'
    },
    {
      id: 3,
      title: 'Blockchain Voting System',
      description: 'A secure and transparent voting system built on blockchain technology to ensure election integrity and voter privacy.',
      skills: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      deadline: '2024-05-10',
      status: 'Planning',
      author: 'Alex Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      likes: 18,
      comments: 5,
      collaborators: 2,
      maxCollaborators: 4,
      createdAt: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
      category: 'Blockchain',
      budget: '$15,000 - $30,000',
      timeline: '9-18 months'
    }
  ])

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'like',
      message: 'Sarah liked your project "Eco-Friendly Shopping App"',
      timestamp: '2 hours ago',
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'comment',
      message: 'Mike commented on "AI-Powered Learning Platform"',
      timestamp: '4 hours ago',
      user: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'collaboration',
      message: 'Alex requested to collaborate on "Blockchain Voting System"',
      timestamp: '1 day ago',
      user: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ])

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: projects.length + 1,
      likes: 0,
      comments: 0,
      collaborators: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProjects(prev => [newProject, ...prev])
  }

  const likeProject = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, likes: project.likes + 1 }
        : project
    ))
  }

  const addComment = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, comments: project.comments + 1 }
        : project
    ))
  }

  const requestCollaboration = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, collaborators: Math.min(project.collaborators + 1, project.maxCollaborators) }
        : project
    ))
  }

  const value = {
    projects,
    recentActivity,
    addProject,
    likeProject,
    addComment,
    requestCollaboration
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}