import React, { useState } from 'react'
import { Send, Users, Video, Phone } from 'lucide-react'

const CollaborationChat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      message: 'Hey team! I\'ve finished the user authentication module. Ready for review.',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      message: 'Great work Sarah! I\'ll take a look at it this afternoon.',
      timestamp: '2:32 PM'
    },
    {
      id: 3,
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: 'Perfect timing! I was just about to start on the frontend integration.',
      timestamp: '2:35 PM'
    }
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  return (
    <div className="card h-96 flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Sarah"
            />
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Mike"
            />
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="You"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Project Team</h3>
            <p className="text-sm text-gray-500">3 members online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Phone className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex space-x-2 max-w-xs ${msg.user === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <img
                className="h-6 w-6 rounded-full object-cover"
                src={msg.avatar}
                alt={msg.user}
              />
              <div>
                <div className={`px-3 py-2 rounded-lg ${
                  msg.user === 'You' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${msg.user === 'You' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

export default CollaborationChat