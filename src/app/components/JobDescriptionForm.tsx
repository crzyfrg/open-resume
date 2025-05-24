"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { parseJobDescription } from 'lib/parse-job-description';
import { performResumeComparison } from 'lib/resume-matcher'; // Import the refactored function
import type { RootState } from 'lib/redux/store';
// Resume type is no longer directly needed here for performResumeComparison's definition

const JobDescriptionForm = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [matchPercentage, setMatchPercentage] = useState<number | null>(null);
  const [analysisPerformed, setAnalysisPerformed] = useState(false);
  
  const resumeData = useSelector((state: RootState) => state.resume);

  // performResumeComparison function is now imported

  const handleAnalyzeClick = () => {
    const jdKeywords = parseJobDescription(jobDescription);
    setExtractedKeywords(jdKeywords);
    
    const currentMatchedKeywords = performResumeComparison(resumeData, jdKeywords);
    setMatchedKeywords(currentMatchedKeywords);
    
    // Calculate Match Percentage
    if (jdKeywords.length === 0) {
      setMatchPercentage(100); // Or 0 or null, depending on desired behavior for no keywords
    } else {
      setMatchPercentage(Math.round((currentMatchedKeywords.length / jdKeywords.length) * 100));
    }

    // Identify Missing Keywords
    const currentMissingKeywords = jdKeywords.filter(keyword => !currentMatchedKeywords.includes(keyword));
    setMissingKeywords(currentMissingKeywords);
    
    setAnalysisPerformed(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Description Analysis</h2>
      <textarea
        className="w-full h-60 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button
        onClick={handleAnalyzeClick}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Analyze Job Description & Compare with Resume
      </button>

      {analysisPerformed && (
        <div className="mt-8">
          {matchPercentage !== null && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-blue-700 text-center">
                Resume Match Score: <span className="text-blue-800">{matchPercentage}%</span>
              </h3>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Extracted Keywords */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {extractedKeywords.length > 0 ? "Keywords from Job Description:" : "No keywords extracted from Job Description."}
              </h3>
              {extractedKeywords.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {extractedKeywords.map((keyword, index) => (
                    <li key={`jd-${index}`} className="text-gray-700">
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Matched Keywords */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">
                {matchedKeywords.length > 0 ? "Matched Keywords in Resume:" : "No matching keywords found in resume."}
              </h3>
              {matchedKeywords.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {matchedKeywords.map((keyword, index) => (
                    <li key={`match-${index}`} className="text-green-600 font-semibold">
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Missing Keywords */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-red-700">
                {missingKeywords.length > 0 ? "Keywords Missing from Resume:" : (extractedKeywords.length > 0 ? "All keywords found in resume! 🎉" : "No keywords to analyze.")}
              </h3>
              {missingKeywords.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {missingKeywords.map((keyword, index) => (
                    <li key={`missing-${index}`} className="text-red-600 font-semibold">
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionForm;
