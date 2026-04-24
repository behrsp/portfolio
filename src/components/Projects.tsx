'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'

interface ProjectsProps {
  projects: any[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="container section-padding">
      <h2 style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Projetos <span className="primary-gradient-text">Destaque</span>
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2.5rem' 
      }}>
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            {/* Media Area */}
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
              {project.videoUrl ? (
                <video 
                  src={project.videoUrl} 
                  controls 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  poster={project.imageUrl}
                />
              ) : (
                <img 
                  src={project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000'} 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
              )}
              <div style={{ 
                position: 'absolute', 
                top: '1rem', 
                right: '1rem' 
              }}>
                <div className="badge" style={{ 
                  backgroundColor: project.status === 'FINISHED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                  color: project.status === 'FINISHED' ? '#4ade80' : '#facc15',
                  borderColor: project.status === 'FINISHED' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'
                }}>
                  {project.status === 'FINISHED' ? 'Finalizado' : 'Em Andamento'}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{project.title}</h3>
              <p style={{ 
                color: 'hsl(var(--muted-foreground))', 
                fontSize: '0.95rem', 
                marginBottom: '1.5rem',
                lineHeight: '1.6' 
              }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.techStack.map((tech: string) => (
                  <span key={tech} style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(var(--border))', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--primary))' }}>
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
