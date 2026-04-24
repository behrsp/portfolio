'use client'
import { motion } from 'framer-motion'
import { Cpu, Database, Layout, Settings } from 'lucide-react'

interface SkillProps {
  skills: any[]
}

const categoryIcons: Record<string, any> = {
  'Sistemas de Gestão': <Settings size={20} />,
  'Frontend': <Layout size={20} />,
  'Backend': <Database size={20} />,
  'default': <Cpu size={20} />
}

export default function Skills({ skills }: SkillProps) {
  // Group skills by category
  const categories = skills.reduce((acc: any, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="container section-padding">
      <h2 style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Base de <span className="primary-gradient-text">Conhecimento</span>
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {Object.keys(categories).map((cat, idx) => (
          <motion.div 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ color: 'hsl(var(--primary))' }}>
                {categoryIcons[cat] || categoryIcons.default}
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{cat}</h3>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {categories[cat].map((skill: any) => (
                <div key={skill.id} className="badge badge-secondary" title={skill.description}>
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
