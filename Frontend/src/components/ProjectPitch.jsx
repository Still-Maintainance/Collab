import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const ProjectPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const slides = [
    {
      title: "Problem Statement",
      content: "Current project management tools lack real-time collaboration features and don't provide meaningful insights into team dynamics.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      title: "Our Solution",
      content: "CollabGrow provides an AI-powered platform that matches collaborators, tracks project progress, and gamifies the collaboration experience.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      title: "Key Features",
      content: "Smart matching, real-time collaboration tools, progress tracking, skill development, and achievement system.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      title: "Market Opportunity",
      content: "The global project management software market is valued at $6.6 billion and growing at 10.67% CAGR.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop"
    },
    {
      title: "Call to Action",
      content: "Join us in revolutionizing how teams collaborate and grow together. Let's build the future of work!",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real app, you'd implement auto-play functionality here
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Project Pitch Mode</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {slides[currentSlide].title}
          </h4>
          <p className="text-gray-600">
            {slides[currentSlide].content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectPitch