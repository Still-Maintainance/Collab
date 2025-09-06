import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Badge from '../components/Badge'
import { Edit, MapPin, Globe, Github, Linkedin, Mail, Calendar } from 'lucide-react'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-lg text-gray-600">{user?.level} Developer</p>
                <p className="text-gray-500 mt-1">{user?.bio}</p>
              </div>
              <Link
                to="/edit-profile"
                className="btn-outline flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
              {user?.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user?.location}
                </div>
              )}
              {user?.website && (
                <a href={user?.website} className="flex items-center hover:text-blue-600">
                  <Globe className="h-4 w-4 mr-1" />
                  Website
                </a>
              )}
              {user?.github && (
                <a href={`https://github.com/${user?.github}`} className="flex items-center hover:text-blue-600">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </a>
              )}
              {user?.linkedin && (
                <a href={`https://linkedin.com/in/${user?.linkedin}`} className="flex items-center hover:text-blue-600">
                  <Linkedin className="h-4 w-4 mr-1" />
                  LinkedIn
                </a>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {new Date(user?.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements & Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">15</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Collaboration Streak</div>
                  <div className="text-sm text-gray-600">15 days in a row</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">8</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Projects Completed</div>
                  <div className="text-sm text-gray-600">All successful</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {user?.badges?.map((badge) => (
                  <Badge key={badge} type="achievement" name={badge} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Projects</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Collaborations</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Streak</span>
                <span className="font-medium text-blue-600">15 days</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {user?.email}
              </div>
              {user?.website && (
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={user?.website} className="hover:text-blue-600">
                    {user?.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile