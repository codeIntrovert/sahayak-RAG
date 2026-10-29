'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Job } from '@/types';
import JobCard from '@/components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchQuery?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getJobs(searchQuery);
      setJobs(data.jobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Find Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered job matching for blue-collar workers across India 🇮🇳
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl shadow-lg p-3 border border-gray-200">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for jobs (painting, plumbing, etc.)"
                className="w-full px-6 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
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
      {!loading && jobs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-3xl">💼</span>
            {search ? `Search Results for "${search}"` : 'All Jobs'}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && jobs.length === 0 && !error && (
        <div className="text-center py-20">
          <div className="text-8xl mb-4">😔</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
          <p className="text-gray-500">
            {search ? `No results for "${search}". Try a different search term.` : 'No jobs available at the moment.'}
          </p>
        </div>
      )}

      {/* Features Section */}
      {!search && jobs.length > 0 && (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">Advanced algorithms to find the perfect job for you</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">🗣️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Multilingual Support</h3>
            <p className="text-gray-600">Search in Hindi and English seamlessly</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600">Get relevant job matches in milliseconds</p>
          </div>
        </div>
      )}
    </div>
  );
}
