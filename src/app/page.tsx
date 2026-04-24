import { prisma } from '@/lib/prisma'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'

export const revalidate = 3600 // Revalidate every hour

async function getData() {
  const profile = await prisma.profile.findFirst()
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  })
  const skills = await prisma.skill.findMany()
  const courses = await prisma.course.findMany()
  const certificates = await prisma.certificate.findMany({
    orderBy: { date: 'desc' }
  })

  return {
    profile: profile || {
      name: 'behrsp',
      bio: 'Desenvolvedor Full Stack',
      email: 'oliveirasaopaulosp@gmail.com',
    },
    projects,
    skills,
    courses,
    certificates
  }
}

export default async function Home() {
  const data = await getData()

  return (
    <div>
      {/* Navigation */}
      <nav className="glass" style={{ 
        position: 'fixed', 
        top: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 100,
        padding: '0.75rem 2rem',
        display: 'flex',
        gap: '2rem',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        <a href="#">Início</a>
        <a href="#projects">Projetos</a>
        <a href="#skills">Conhecimento</a>
        <a href="#education">Formação</a>
      </nav>

      <Hero profile={data.profile} />
      
      <div style={{ position: 'relative' }}>
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Education courses={data.courses} certificates={data.certificates} />
      </div>

      <footer className="container" style={{ padding: '4rem 0', textAlign: 'center', color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} behrsp. Todos os direitos reservados.</p>
        <p style={{ marginTop: '0.5rem' }}>Construído com Next.js, React e NeonDB</p>
      </footer>
    </div>
  )
}
