"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b border-gray-200 bg-white shadow-sm px-3 lg:px-12",
        isHomePage && "bg-gradient-to-b from-primary-50 to-white"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="sr-only">Make My Resume</span>
          <div className="h-auto w-auto">
            <Image
              src={logoSrc}
              alt="Make My Resume Logo"
              className="h-18 w-auto"
              width={360}
              height={25}
              priority
            />
          </div>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Parser"],
            ["/jd-comparison", "JD Comparison"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathName === href
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              } transition-colors duration-200`}
              href={href}
            >
              {text}
            </Link>
          ))}
          <a
            href="https://github.com/crzyfrg/open-resume"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center text-gray-700 hover:text-gray-900"
            aria-label="GitHub repository"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};
