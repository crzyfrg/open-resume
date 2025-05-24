import type { Resume } from 'lib/redux/types';

export const performResumeComparison = (currentResumeData: Resume, jdKeywords: string[]): string[] => {
  const foundMatches: Set<string> = new Set();
  if (!jdKeywords || jdKeywords.length === 0) return [];

  const resumeTextsToSearch: string[] = [];

  // 1. Profile Summary
  if (currentResumeData.profile?.summary) {
    resumeTextsToSearch.push(currentResumeData.profile.summary.toLowerCase());
  }

  // 2. Skills
  if (currentResumeData.skills?.featuredSkills) {
    currentResumeData.skills.featuredSkills.forEach(skill => {
      if (skill.skill) resumeTextsToSearch.push(skill.skill.toLowerCase());
    });
  }
  if (currentResumeData.skills?.descriptions) {
    currentResumeData.skills.descriptions.forEach(desc => {
      if (desc) resumeTextsToSearch.push(desc.toLowerCase());
    });
  }
  
  // 3. Work Experiences
  if (currentResumeData.workExperiences) {
    currentResumeData.workExperiences.forEach(exp => {
      if (exp.descriptions) {
        exp.descriptions.forEach(desc => {
          if (desc) resumeTextsToSearch.push(desc.toLowerCase());
        });
      }
      // Also consider jobTitle and company
      if (exp.jobTitle) resumeTextsToSearch.push(exp.jobTitle.toLowerCase());
      if (exp.company) resumeTextsToSearch.push(exp.company.toLowerCase());
    });
  }

  // 4. Projects
  if (currentResumeData.projects) {
    currentResumeData.projects.forEach(proj => {
      if (proj.descriptions) {
        proj.descriptions.forEach(desc => {
          if (desc) resumeTextsToSearch.push(desc.toLowerCase());
        });
      }
      // Also consider project name
      if (proj.project) resumeTextsToSearch.push(proj.project.toLowerCase());
    });
  }

  // 5. Educations
  if (currentResumeData.educations) {
    currentResumeData.educations.forEach(edu => {
      if (edu.descriptions) {
        edu.descriptions.forEach(desc => {
          if (desc) resumeTextsToSearch.push(desc.toLowerCase());
        });
      }
       // Also consider school and degree
      if (edu.school) resumeTextsToSearch.push(edu.school.toLowerCase());
      if (edu.degree) resumeTextsToSearch.push(edu.degree.toLowerCase());
    });
  }
  
  const fullResumeText = resumeTextsToSearch.join(' ');

  jdKeywords.forEach(keyword => {
    // Check for whole word match to avoid partial matches (e.g. "react" in "reaction")
    const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // 'i' for case-insensitive, already lowercased but good practice
    if (regex.test(fullResumeText)) {
      foundMatches.add(keyword);
    }
  });

  return Array.from(foundMatches);
};
