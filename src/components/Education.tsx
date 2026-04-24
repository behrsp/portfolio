'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, BookOpen, Calendar, X, ExternalLink } from 'lucide-react'

interface EducationProps {
  courses: any[]
  certificates: any[]
}

export default function Education({ courses, certificates }: EducationProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const openFile = (fileData: string) => {
    if (fileData.startsWith('data:application/pdf')) {
      // For PDFs, open in new tab
      const win = window.open()
      win?.document.write(`<iframe src="${fileData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`)
    } else {
      setSelectedFile(fileData)
    }
  }

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
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  {cert.fileData && (
                    <button 
                      onClick={() => openFile(cert.fileData)}
                      style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <ExternalLink size={14} /> Visualizar Arquivo
                    </button>
                  )}
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ExternalLink size={14} /> Link Externo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {certificates.length === 0 && <p style={{ color: 'hsl(var(--muted-foreground))' }}>Nenhum certificado cadastrado.</p>}
          </div>
        </div>

      </div>

      {/* Modal for Image Certificates */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFile(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
          >
            <button 
              onClick={() => setSelectedFile(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedFile} 
              alt="Certificado" 
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }} 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
