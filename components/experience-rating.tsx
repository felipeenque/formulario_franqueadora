"use client"

import { useState } from "react"
import { Star } from 'lucide-react'

interface ExperienceRatingProps {
  label: string
  name: string
  value: string
  onValueChange: (name: string, value: string) => void
  icon: React.ComponentType<{ className?: string }>
  required?: boolean
}

export function ExperienceRating({ 
  label, 
  name, 
  value, 
  onValueChange, 
  icon: Icon, 
  required = false 
}: ExperienceRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  
  const ratings = [
    { value: "1", label: "Nenhuma" },
    { value: "2", label: "Básica" },
    { value: "3", label: "Intermediária" },
    { value: "4", label: "Boa" },
    { value: "5", label: "Excelente" }
  ]

  const handleClick = (rating: string) => {
    onValueChange(name, rating)
  }

  const currentRating = parseInt(value) || 0
  const displayRating = hoveredRating || currentRating

  return (
    <div className="space-y-3">
      <label className="flex items-center text-sm font-medium">
        <Icon className="h-4 w-4 mr-2 text-[#F9A51A]" />
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className="p-1 hover:scale-110 transition-transform"
            onClick={() => handleClick(rating.toString())}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(null)}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                rating <= displayRating
                  ? 'fill-[#F9A51A] text-[#F9A51A]'
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        {displayRating > 0 && ratings[displayRating - 1]?.label}
      </div>
    </div>
  )
}
