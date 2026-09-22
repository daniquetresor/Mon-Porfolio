import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import CurrentlyExploring from "@/components/sections/CurrentlyExploring";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <Projects />
      <Experience />
      <CurrentlyExploring />
      <Contact />
    </>
  );
}
