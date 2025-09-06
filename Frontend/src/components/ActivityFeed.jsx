import React from 'react'
import { Heart, MessageCircle, UserPlus, Bell } from 'lucide-react'
import { useProjects } from '../contexts/ProjectContext'

const ActivityFeed = () => {
  const { recentActivity } = useProjects()

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'collaboration':
        return <UserPlus className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={activity.avatar}
                alt={activity.user}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {getIcon(activity.type)}
                <p className="text-sm text-gray-900">{activity.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed