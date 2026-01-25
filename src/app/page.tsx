import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Hobbies from "@/components/sections/Hobbies";
import HomeHighlights from "@/components/sections/HomeHighlights";
import PhotographyHighlights from "@/components/sections/PhotographyHighlights";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio highlights, hobbies, and photography from Tobias Bordenca.",
};

export default function HomePage() {
  return (
    <>
      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <Hero />
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <HomeHighlights />
      </section>

      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <Hobbies />
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <PhotographyHighlights />
      </section>
    </>
  );
}
