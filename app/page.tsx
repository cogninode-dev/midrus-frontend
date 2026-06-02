import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Process from '@/components/process'
import Team from '@/components/team'
import Testimonials from '@/components/testimonials'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-white text-foreground">
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Team />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}
