"use client";

import JobDescriptionForm from "components/JobDescriptionForm";

export default function JDComparisonPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Job Description Comparison
        </h1>
        <p className="text-lg text-gray-600">
          Paste a job description to analyze how well your resume matches the requirements. 
          We'll extract key skills and compare them with your resume to help you optimize your application.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">
            Compare Your Resume with a Job Description
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Get instant feedback on how well your resume matches the job requirements.
          </p>
        </div>
        
        <div className="p-6">
          <JobDescriptionForm />
        </div>
      </div>
      
      <div className="mt-12 bg-primary-50 rounded-xl p-6 border border-primary-100">
        <h3 className="text-lg font-medium text-primary-800 mb-3">
          💡 Tips for Better Matches
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Use the same keywords as in the job description</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Highlight relevant experience and skills</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Quantify achievements where possible</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
