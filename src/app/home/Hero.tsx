import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center bg-gradient-to-b from-primary-50 to-white">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left px-6 lg:px-0">
        <h1 className="text-primary-700 pb-2 text-4xl font-bold lg:text-5xl">
          Create a Professional
          <br />
          Resume in Minutes
        </h1>
        <p className="mt-3 text-lg text-gray-700 lg:mt-5 lg:text-xl">
          Build an ATS-friendly resume with our easy-to-use resume builder
        </p>
        <Link 
          href="/resume-import" 
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:mt-8"
        >
          Create My Resume <span aria-hidden="true" className="ml-2">→</span>
        </Link>
        <p className="mt-3 text-sm text-gray-600">No sign up required - Start for free</p>
        <p className="mt-8 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Analyze it with our{" "}
          <Link href="/resume-parser" className="font-medium text-primary-700 hover:text-primary-600">
            Resume Parser
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <AutoTypingResume />
      </div>
    </section>
  );
};
