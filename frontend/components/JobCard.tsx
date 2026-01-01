'use client';

import { Job } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          {!imageError ? (
            <img
              src={`http://localhost:5000/static/images/${job.category}.jpg`}
              alt={job.category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl">
                {getCategoryIcon(job.category)}
              </div>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
            {job.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-lg">👤</span>
              {job.employer}
            </p>
            <p className="text-gray-500 flex items-center gap-2">
              <span className="text-lg">📍</span>
              {job.location}
            </p>
            <p className="text-green-600 font-semibold text-base mt-3 flex items-center gap-2">
              <span className="text-lg">💰</span>
              {job.salary}
            </p>
          </div>

          {/* Description Preview */}
          <p className="text-gray-500 text-sm mt-3 line-clamp-2">
            {job.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    painting: '🎨',
    plumbing: '🔧',
    electrical: '⚡',
    carpentry: '🪚',
    gardening: '🌱',
    driving: '🚗',
    cooking: '👨‍🍳',
    security: '👮',
    cleaning: '🧹',
    construction: '🏗️',
  };
  
  return icons[category.toLowerCase()] || '💼';
}
