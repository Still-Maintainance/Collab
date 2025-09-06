import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProjects } from '../contexts/ProjectContext'
import CollaborationChat from '../components/CollaborationChat'
import ProjectPitch from '../components/ProjectPitch'
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  FileText, 
  BarChart3, 
  Settings,
  Video,
  Phone,
  Share2
} from 'lucide-react'

const CollaborationSpace = () => {
  const { id } = useParams()
  const { projects } = useProjects()
  const [activeTab, setActiveTab] = useState('chat')
  
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
        <p className="text-gray-600">The collaboration space for this project is not available.</p>
      </div>
    )
  }

  const tabs = [
    { id: 'chat', name: 'Chat', icon: Users },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'files', name: 'Files', icon: FileText },
    { id: 'timeline', name: 'Timeline', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'pitch', name: 'Pitch Mode', icon: Share2 }
  ]

  const mockTasks = [
    {
      id: 1,
      title: 'Set up project repository',
      assignee: 'Sarah Johnson',
      status: 'completed',
      dueDate: '2024-01-20'
    },
    {
      id: 2,
      title: 'Design user interface mockups',
      assignee: 'Mike Chen',
      status: 'in-progress',
      dueDate: '2024-01-25'
    },
    {
      id: 3,
      title: 'Implement authentication system',
      assignee: 'You',
      status: 'pending',
      dueDate: '2024-01-30'
    },
    {
      id: 4,
      title: 'Write API documentation',
      assignee: 'Alex Rodriguez',
      status: 'pending',
      dueDate: '2024-02-05'
    }
  ]

  const mockFiles = [
    {
      id: 1,
      name: 'project-requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2 hours ago'
    },
    {
      id: 2,
      name: 'ui-mockups.fig',
      type: 'figma',
      size: '5.1 MB',
      uploadedBy: 'Mike Chen',
      uploadedAt: '1 day ago'
    },
    {
      id: 3,
      name: 'database-schema.sql',
      type: 'sql',
      size: '156 KB',
      uploadedBy: 'You',
      uploadedAt: '3 days ago'
    }
  ]

  const mockTimeline = [
    {
      id: 1,
      date: '2024-01-15',
      title: 'Project Started',
      description: 'Project collaboration space created',
      type: 'milestone'
    },
    {
      id: 2,
      date: '2024-01-16',
      title: 'Repository Setup',
      description: 'Git repository created and initial structure established',
      type: 'task'
    },
    {
      id: 3,
      date: '2024-01-17',
      title: 'Team Meeting',
      description: 'Initial team meeting to discuss project scope and timeline',
      type: 'meeting'
    },
    {
      id: 4,
      date: '2024-01-18',
      title: 'UI Design Phase',
      description: 'Started working on user interface mockups',
      type: 'task'
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <CollaborationChat />
      
      case 'tasks':
        return (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Project Tasks</h3>
              <button className="btn-primary">
                Add Task
              </button>
            </div>
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Assigned to: {task.assignee}</span>
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : task.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'files':
        return (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Project Files</h3>
              <button className="btn-primary">
                Upload File
              </button>
            </div>
            <div className="space-y-4">
              {mockFiles.map((file) => (
                <div key={file.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Uploaded by {file.uploadedBy}</span>
                      <span>•</span>
                      <span>{file.uploadedAt}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'timeline':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
            <div className="space-y-4">
              {mockTimeline.map((event) => (
                <div key={event.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      event.type === 'milestone' 
                        ? 'bg-blue-600'
                        : event.type === 'meeting'
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-gray-600">Project Completion</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-gray-600">Tasks Completed</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
                <div className="text-gray-600">Active Members</div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Activity chart would be displayed here</p>
              </div>
            </div>
          </div>
        )
      
      case 'pitch':
        return <ProjectPitch />
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-gray-600">Collaboration Space</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  )
}

export default CollaborationSpace