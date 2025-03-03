import React from 'react'
import "./Skeleton.css"

function SkeletonCard() {
  return (
    <div className="shadow-lg rounded-lg p-6 w-full mx-auto bg-white border border-[#dee2e6]">
    <div className="skeleton-card h-8 w-48 mb-6"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="skeleton-card h-6 w-32 mb-4"></div>
        <div className="skeleton-card h-6 w-48 mb-4"></div>
        <div className="skeleton-card h-6 w-64 mb-4"></div>
        <div className="skeleton-card h-6 w-24 mb-4"></div>
      </div>
      <div>
        <div className="skeleton-card h-6 w-48 mb-4"></div>
        <div className="skeleton-card h-6 w-32 mb-4"></div>
        <div className="skeleton-card h-6 w-24 mb-4"></div>
      </div>
    </div>
    <div className="mt-8 flex justify-end space-x-4">
      <div className="skeleton-card h-10 w-24"></div>
      <div className="skeleton-card h-10 w-24"></div>
    </div>
  </div>
  )
}

export default SkeletonCard