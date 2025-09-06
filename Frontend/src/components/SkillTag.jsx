import React from 'react'
import { X } from 'lucide-react'

const SkillTag = ({ skill, removable = false, onRemove }) => {
  return (
    <span className="skill-tag group">
      {skill}
      {removable && (
        <button
          onClick={() => onRemove(skill)}
          className="ml-1 text-blue-600 hover:text-blue-800"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export default SkillTag