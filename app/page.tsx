import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/home/about-section"
// import { BlogSection } from "@/components/home/blog-section"
import { ContactSection } from "@/components/home/contact-section"
import { FaqSection } from "@/components/home/faq-section"
import { HeroSection } from "@/components/home/hero-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { ServicesSection } from "@/components/home/services-section"
import { TeamSection } from "@/components/home/team-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"

const HomePage = () => {

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  )

}

export default HomePage
