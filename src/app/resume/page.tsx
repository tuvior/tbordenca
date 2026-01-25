import type { Metadata } from "next";
import Link from "next/link";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import SectionTitle from "@/components/ui/SectionTitle";
import { footerData } from "@/data/footerData";
import { profileData } from "@/data/profileData";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, skills, and education for Tobias Bordenca.",
};

const getProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 80) {
    return "bg-nord-14";
  }
  if (proficiency >= 60) {
    return "bg-nord-14/70";
  }
  if (proficiency >= 40) {
    return "bg-nord-14/40";
  }
  return "bg-nord-14/20";
};

export default function ResumePage() {
  return (
    <>
      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <Experience />
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <Skills />
      </section>

      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <div className="mx-auto w-full max-w-6xl px-4">
          <SectionTitle title="Languages" subtitle="How I communicate across teams and cultures." />
          <div className="rounded-2xl border border-nord-4 bg-nord-6/70 p-8 shadow-lg dark:border-nord-3 dark:bg-nord-1/60">
            <div className="grid gap-6 md:grid-cols-2">
              {profileData.languages.map(language => (
                <div key={language.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">{language.name}</span>
                    <span className="text-sm text-nord-3 dark:text-nord-4">
                      {language.level}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                    <div
                      className={`h-full rounded-full ${getProficiencyColor(language.proficiency)}`}
                      style={{ width: `${language.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <Education />
      </section>

      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <div className="mx-auto w-full max-w-6xl px-4">
          <SectionTitle title="Download Resume" />
          <div className="flex justify-center">
            <Link
              href={footerData.resume.url}
              className="btn btn-primary inline-flex items-center gap-2"
              download={footerData.resume.fileName}
            >
              Download CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
