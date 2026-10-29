'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Job } from '@/types';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getJob(Number(params.id));
      setJob(data.job);
    } catch (err) {
      setError('Failed to fetch job details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center">
            <span className="text-3xl mr-4">⚠️</span>
            <div>
              <p className="text-red-800 font-semibold text-lg">Error</p>
              <p className="text-red-600">{error || 'Job not found'}</p>
            </div>
          </div>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
      >
        <span className="mr-2">←</span> Back to Jobs
      </Link>

      {/* Job Card */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {job.category}
            </span>
            <span className="text-4xl">{getCategoryIcon(job.category)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{job.title}</h1>
        </div>

        {/* Details */}
        <div className="p-8 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">Employer</p>
                <p className="text-lg font-semibold text-gray-800">{job.employer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-lg font-semibold text-gray-800">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">Salary</p>
                <p className="text-lg font-semibold text-green-600">{job.salary}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">Contact</p>
                <p className="text-lg font-semibold text-gray-800">{job.phone}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
          </div>

          {/* Action Button */}
          <a
            href={`tel:${job.phone}`}
            className="block w-full text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            📞 Call Employer Now
          </a>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-3xl">🗺️</span>
          Location on Map
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(job.location)}&output=embed`}
          />
        </div>
      </div>
    </div>
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
