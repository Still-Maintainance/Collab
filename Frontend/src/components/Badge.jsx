import React from 'react'
import { Trophy, Star, Users, Zap } from 'lucide-react'

const Badge = ({ type, name, description }) => {
  const getIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-4 w-4" />
      case 'streak':
        return <Star className="h-4 w-4" />
      case 'collaboration':
        return <Users className="h-4 w-4" />
      case 'innovation':
        return <Zap className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getColor = () => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800'
      case 'streak':
        return 'bg-green-100 text-green-800'
      case 'collaboration':
        return 'bg-blue-100 text-blue-800'
      case 'innovation':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`badge ${getColor()} flex items-center space-x-1`} title={description}>
      {getIcon()}
      <span>{name}</span>
    </div>
  )
}

export default Badge