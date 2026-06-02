'use client'

import { User } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
}

const team: TeamMember[] = [
  {
    id: 1,
    name: 'Manoj Sahoo',
    role: 'Founder & Managing Director',
    bio: 'Seasoned finance and compliance expert with deep experience in GST, income tax, and corporate law across Odisha.',
  },
  {
    id: 2,
    name: 'Dusasan Sahoo',
    role: 'Director',
    bio: 'Leads strategic operations and business development, ensuring MIDRUS delivers consistent quality across all client engagements.',
  },
  {
    id: 3,
    name: 'Sunil Behera',
    role: 'Manager',
    bio: 'Oversees day-to-day operations, client coordination, and service delivery to maintain the highest standards of client satisfaction.',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Team
          </h2>
          <p className="text-base md:text-lg text-grey max-w-lg leading-relaxed">
            Our qualified team of accounting, tax, and legal professionals is dedicated to keeping your business compliant and financially strong.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className="group relative p-5 sm:p-8 bg-grey-light rounded-lg border-2 border-border hover:border-accent hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shrink-0">
                  <User className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-base text-grey leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {member.bio}
              </p>

              {/* Hover background accent */}
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
