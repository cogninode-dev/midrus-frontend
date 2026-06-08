import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white text-foreground">
      <Navigation />
      {children}
      <Footer />
    </main>
  )
}
