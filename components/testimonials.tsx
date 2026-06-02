'use client'

interface Testimonial {
  id: number
  quote: string
  author: string
  company: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'MIDRUS has been an exceptional partner for Cogninode. Their expertise in accounting, GST compliance, and financial advisory has helped us stay focused on building great software while they handle everything financial with precision and professionalism.',
    author: 'Cogninode Team',
    company: 'Cogninode Software Pvt Ltd',
    role: 'Management',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 text-balance animate-fadeInUp">
          What Our Clients Say
        </h2>

        {/* Testimonials Grid */}
        <div className="max-w-3xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="group relative p-8 bg-grey-light rounded-lg border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-foreground mb-8 italic font-light leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-border pt-6">
                <p className="font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {testimonial.author}
                </p>
                <p className="text-sm text-grey group-hover:text-foreground/60 transition-colors duration-300">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
