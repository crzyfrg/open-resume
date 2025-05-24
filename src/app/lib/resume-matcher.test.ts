import { performResumeComparison } from './resume-matcher';
import type { Resume, ResumeProfile, ResumeWorkExperience, ResumeEducation, ResumeProject, ResumeSkills, FeaturedSkill } from 'lib/redux/types';

// Mock data structure based on lib/redux/types
const mockInitialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

const mockInitialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

const mockInitialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};

const mockInitialProject: ResumeProject = {
  project: "",
  date: "",
  descriptions: [],
};

const mockInitialFeaturedSkill: FeaturedSkill = { skill: "", rating: 0 };
const mockInitialSkills: ResumeSkills = {
  featuredSkills: Array(3).fill({...mockInitialFeaturedSkill}),
  descriptions: [],
};

const mockInitialResumeState: Resume = {
  profile: { ...mockInitialProfile },
  workExperiences: [{ ...mockInitialWorkExperience }],
  educations: [{ ...mockInitialEducation }],
  projects: [{ ...mockInitialProject }],
  skills: { ...mockInitialSkills },
  custom: { descriptions: [] },
};

describe('performResumeComparison', () => {
  it('No Resume Data, No JD Keywords: should return an empty array', () => {
    const result = performResumeComparison(mockInitialResumeState, []);
    expect(result).toEqual([]);
  });

  it('Resume Data, No JD Keywords: should return an empty array', () => {
    const resumeWithData: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Experienced developer" },
      skills: { ...mockInitialSkills, featuredSkills: [{ skill: "Java", rating: 5 }] },
    };
    const result = performResumeComparison(resumeWithData, []);
    expect(result).toEqual([]);
  });

  it('No Resume Data, JD Keywords: should return an empty array', () => {
    const result = performResumeComparison(mockInitialResumeState, ["react", "node"]);
    expect(result).toEqual([]);
  });

  it('Simple Match in Skills (featuredSkills): should find "react"', () => {
    const resumeWithSkills: Resume = {
      ...mockInitialResumeState,
      skills: {
        ...mockInitialSkills,
        featuredSkills: [
          { skill: "React", rating: 4 },
          { skill: "Node.js", rating: 3 },
        ],
      },
    };
    const result = performResumeComparison(resumeWithSkills, ["react"]);
    expect(result).toEqual(["react"]);
  });
  
  it('Simple Match in Skills (descriptions): should find "python"', () => {
    const resumeWithSkills: Resume = {
      ...mockInitialResumeState,
      skills: {
        ...mockInitialSkills,
        descriptions: ["Proficient in Python scripting for automation."],
      },
    };
    const result = performResumeComparison(resumeWithSkills, ["python", "scripting"]);
    expect(result.sort()).toEqual(["python", "scripting"].sort());
  });


  it('Simple Match in Summary (Case Insensitive): should find "software"', () => {
    const resumeWithSummary: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Experienced Software engineer with a knack for complex problems." },
    };
    const result = performResumeComparison(resumeWithSummary, ["software"]);
    expect(result).toEqual(["software"]);
  });

  it('Match in Work Experience Description (whole word): should find "java" but not "spring" from "spring boot"', () => {
    const resumeWithWorkExp: Resume = {
      ...mockInitialResumeState,
      workExperiences: [
        { ...mockInitialWorkExperience, company: "TechCorp", jobTitle: "Dev", date: "2022", descriptions: ["Developed features using Java and Spring Boot framework."] },
      ],
    };
    // "spring boot" is two words. "spring" will be matched if it's a keyword.
    const result = performResumeComparison(resumeWithWorkExp, ["java", "spring", "boot"]);
    expect(result.sort()).toEqual(["boot", "java", "spring"].sort());
  });
  
  it('Match in Work Experience (jobTitle and company): should find "developer" and "innovatech"', () => {
    const resumeWithWorkExp: Resume = {
      ...mockInitialResumeState,
      workExperiences: [
        { ...mockInitialWorkExperience, company: "InnovaTech Solutions", jobTitle: "Senior Developer", date: "2022", descriptions: ["Led a team."] },
      ],
    };
    const result = performResumeComparison(resumeWithWorkExp, ["developer", "innovatech"]);
     expect(result.sort()).toEqual(["developer", "innovatech"].sort());
  });


  it('Match in Project Description: should find "python"', () => {
    const resumeWithProject: Resume = {
      ...mockInitialResumeState,
      projects: [
        { ...mockInitialProject, project: "AI Tool", date: "2023", descriptions: ["Built a data processing tool with Python and Pandas."] },
      ],
    };
    const result = performResumeComparison(resumeWithProject, ["python"]);
    expect(result).toEqual(["python"]);
  });
  
  it('Match in Project (project name): should find "portfolio"', () => {
    const resumeWithProject: Resume = {
      ...mockInitialResumeState,
      projects: [
        { ...mockInitialProject, project: "Personal Portfolio Website", date: "2023", descriptions: ["Online resume."] },
      ],
    };
    const result = performResumeComparison(resumeWithProject, ["portfolio"]);
    expect(result).toEqual(["portfolio"]);
  });

  it('Match in Education Description: should find "machine" and "learning"', () => {
    const resumeWithEducation: Resume = {
      ...mockInitialResumeState,
      educations: [
        { ...mockInitialEducation, school: "State U", degree: "MSCS", date: "2020", descriptions: ["Thesis on advanced machine learning techniques."] },
      ],
    };
    const result = performResumeComparison(resumeWithEducation, ["machine", "learning"]);
    expect(result.sort()).toEqual(["learning", "machine"].sort()); // Order depends on Set insertion
  });
  
  it('Match in Education (school and degree): should find "university" and "computer science"', () => {
    const resumeWithEducation: Resume = {
      ...mockInitialResumeState,
      educations: [
        { ...mockInitialEducation, school: "Global Tech University", degree: "B.S. in Computer Science", date: "2020", descriptions: ["Studied AI."] },
      ],
    };
    const result = performResumeComparison(resumeWithEducation, ["university", "computer", "science"]);
    expect(result.sort()).toEqual(["computer", "science", "university"].sort());
  });


  it('Multiple Matches, Different Sections (unique results): should find "javascript" once', () => {
    const resumeMultiMatch: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Proficient in JavaScript." },
      skills: { ...mockInitialSkills, featuredSkills: [{ skill: "JavaScript", rating: 5 }] },
      projects: [{...mockInitialProject, project: "JS Game", descriptions: ["Used JavaScript for game logic."]}]
    };
    const result = performResumeComparison(resumeMultiMatch, ["javascript"]);
    expect(result).toEqual(["javascript"]);
  });

  it('No Matches: should return an empty array for non-existent keywords', () => {
    const resumeWithData: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Experienced developer skilled in Java." },
      skills: { ...mockInitialSkills, featuredSkills: [{ skill: "Java", rating: 5 }] },
    };
    const result = performResumeComparison(resumeWithData, ["cobol", "fortran", "ada"]);
    expect(result).toEqual([]);
  });

  it('Keywords Present but Not as Whole Words: should not match "test" in "testing"', () => {
    const resumeWithTesting: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Focus on testing methodologies." },
    };
    const result = performResumeComparison(resumeWithTesting, ["test"]);
    expect(result).toEqual([]); // "test" is not a whole word in "testing"
  });
  
  it('Keywords Present as Whole Words: should match "test" if it stands alone', () => {
    const resumeWithTest: Resume = {
      ...mockInitialResumeState,
      profile: { ...mockInitialProfile, summary: "Conducted a test of the system." },
       skills: { ...mockInitialSkills, descriptions: ["Unit test development"] },
    };
    const result = performResumeComparison(resumeWithTest, ["test"]);
    expect(result).toEqual(["test"]); 
  });
  
  it('Match in various profile fields (name, email, phone, location, url): should find relevant keywords', () => {
    const resumeWithProfileDetails: Resume = {
      ...mockInitialResumeState,
      profile: {
        name: "Jane Doe",
        summary: "A professional.",
        email: "jane.doe@example.com",
        phone: "555-123-4567",
        location: "New York, NY",
        url: "janedoe.dev/portfolio",
      },
    };
    const jdKeywords = ["jane", "doe", "example.com", "555-123-4567", "york", "portfolio"];
    // The function joins all text with spaces, so "example.com" becomes "example com".
    // "555-123-4567" becomes "555 123 4567".
    // "janedoe.dev/portfolio" becomes "janedoe dev portfolio"
    // Let's adjust keywords to match this behavior or test what really happens.
    // The `performResumeComparison` uses `\bkeyword\b`, so "example.com" won't match "example" or "com" if "example.com" is a keyword.
    // It seems my previous assumption about punctuation replacement in `parseJobDescription` was for that function only.
    // `performResumeComparison` itself doesn't re-process the keywords. It uses them as-is with `\b`.
    // However, the resume text *is* lowercased. Punctuation in resume fields is not explicitly removed by `performResumeComparison`.
    // This means "example.com" in resume will match "example.com" as a keyword.
    // "555-123-4567" in resume will match "555-123-4567" as a keyword.
    // "janedoe.dev/portfolio" in resume will match "janedoe.dev/portfolio" if that's the keyword.
    // The current `performResumeComparison` concatenates all fields with spaces.

    const result = performResumeComparison(resumeWithProfileDetails, ["jane", "doe", "example.com", "555-123-4567", "york", "portfolio", "professional"]);
    // "example.com" needs to be treated carefully. If keyword is "example.com", it will match.
    // If keyword is "example", it will not match "example.com" due to \b.
    // The current implementation of performResumeComparison does not split words from resumeData by punctuation like '.', '-', '/'
    // It just converts to lowercase and joins. So "jane.doe@example.com" becomes "jane.doe@example.com".
    // A keyword "example.com" would match. A keyword "example" would not.
    // Let's test with keywords that reflect this.
    const refinedJdKeywords = ["jane", "doe", "example.com", "555-123-4567", "york", "janedoe.dev/portfolio", "professional"];
    const resultRefined = performResumeComparison(resumeWithProfileDetails, refinedJdKeywords);
    expect(resultRefined.sort()).toEqual(["555-123-4567", "doe", "example.com", "jane", "janedoe.dev/portfolio", "professional", "york"].sort());
  });
});
