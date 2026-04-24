'use client'
import { motion } from 'framer-motion'
import { Award, BookOpen, Calendar } from 'lucide-react'

interface EducationProps {
  courses: any[]
  certificates: any[]
}

export default function Education({ courses, certificates }: EducationProps) {
  return (
    <section id="education" className="container section-padding">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Courses Section */}
        <div>
          <h2 style={{ marginBottom: '2.5rem', fontSize: '2rem' }}>
            <BookOpen size={28} style={{ verticalAlign: 'middle', marginRight: '0.75rem', color: 'hsl(var(--primary))' }} />
            Cursos
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {courses.map((course, idx) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{course.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>{course.platform}</p>
                  </div>
                  <div className="badge" style={{ fontSize: '0.65rem' }}>
                    {course.status === 'FINISHED' ? 'Concluído' : 'Em Andamento'}
                  </div>
                </div>
              </motion.div>
            ))}
            {courses.length === 0 && <p style={{ color: 'hsl(var(--muted-foreground))' }}>Nenhum curso cadastrado.</p>}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h2 style={{ marginBottom: '2.5rem', fontSize: '2rem' }}>
            <Award size={28} style={{ verticalAlign: 'middle', marginRight: '0.75rem', color: 'hsl(var(--primary))' }} />
            Certificados
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {certificates.map((cert, idx) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cert.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))' }}>
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} />
                    {new Date(cert.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '1rem', fontSize: '0.85rem', color: 'hsl(var(--primary))' }}>
                    Ver Certificado →
                  </a>
                )}
              </motion.div>
            ))}
            {certificates.length === 0 && <p style={{ color: 'hsl(var(--muted-foreground))' }}>Nenhum certificado cadastrado.</p>}
          </div>
        </div>

      </div>
    </section>
  )
}
