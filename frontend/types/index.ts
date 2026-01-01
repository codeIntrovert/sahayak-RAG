// Type definitions for the application

export interface Job {
  id: number;
  title: string;
  title_hi?: string;
  category: string;
  employer: string;
  employer_hi?: string;
  location: string;
  location_hi?: string;
  salary: string;
  salary_hi?: string;
  phone: string;
  description: string;
  description_hi?: string;
}

export interface JobsResponse {
  jobs: Job[];
  search: string;
}

export interface JobResponse {
  job: Job;
}

export interface ErrorResponse {
  error: string;
}
