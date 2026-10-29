'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Job } from '@/types';
import JobCard from '@/components/JobCard';
import Link from 'next/link';

export default function ProfilePage() {
  const [employerName, setEmployerName] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employerName.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const data = await api.getEmployerJobs(employerName);
      setJobs(data.jobs);
    } catch (err) {
      setError('Failed to fetch your jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await api.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      alert('Failed to delete job. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
      >
        <span className="mr-2">←</span> Back to Home
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-lg text-gray-600">Manage your job postings</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl shadow-lg p-3 border border-gray-200">
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            placeholder="Enter your name to view your jobs"
            className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none text-lg"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Find My Jobs
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      {/* Job Listings */}
      {!loading && searched && jobs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-3xl">💼</span>
            Jobs Posted by {employerName}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({jobs.length} {jobs.length === 1 ? 'job' : 'jobs'})
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard job={job} />
                <button
                  onClick={() => handleDelete(job.id)}
                  className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md transition-all z-10"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searched && jobs.length === 0 && !error && (
        <div className="text-center py-20">
          <div className="text-8xl mb-4">📭</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
          <p className="text-gray-500 mb-6">
            You haven&apos;t posted any jobs yet as &quot;{employerName}&quot;
          </p>
          <Link
            href="/jobs/create"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all"
          >
            + Create Your First Job
          </Link>
        </div>
      )}

      {/* Initial State */}
      {!loading && !searched && (
        <div className="text-center py-20">
          <div className="text-8xl mb-4">👤</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Your Profile</h3>
          <p className="text-gray-500">
            Enter your name above to view and manage your job postings
          </p>
        </div>
      )}
    </div>
  );
}
