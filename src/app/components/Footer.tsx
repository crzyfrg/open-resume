import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900">Make My Resume</h3>
            <p className="mt-4 text-sm text-gray-500">
              Create professional, ATS-friendly resumes in minutes. No sign up required.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/resume-builder" className="text-sm text-gray-600 hover:text-primary-600">Resume Builder</Link></li>
              <li><Link href="/resume-parser" className="text-sm text-gray-600 hover:text-primary-600">Resume Parser</Link></li>
              <li><Link href="/jd-comparison" className="text-sm text-gray-600 hover:text-primary-600">JD Comparison</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-600 hover:text-primary-600">Blog</Link></li>
              <li><Link href="/resume-templates" className="text-sm text-gray-600 hover:text-primary-600">Resume Templates</Link></li>
              <li><Link href="/career-advice" className="text-sm text-gray-600 hover:text-primary-600">Career Advice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-primary-600">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} Make My Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
