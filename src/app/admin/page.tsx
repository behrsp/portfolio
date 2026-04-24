'use client'
import { useState, useEffect } from 'react'
import { updateProfile, addProject, deleteProject, addSkill, deleteSkill, addCourse, addCertificate } from './actions'
import { Save, Plus, Trash2, ArrowLeft, User, Briefcase, Code, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<any>({ name: '', bio: '', image: '', github: '', linkedin: '', email: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial data
    async function fetchData() {
      const res = await fetch('/') // This is a bit hacky, but for now we'll just fetch from the main data if we had an API.
      // Actually, since this is a server component normally, we'd pass data. 
      // But we'll just use the actions or a separate API.
      // For now, I'll just assume the user will fill the fields or we'll add a fetch action.
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    await updateProfile(data)
    alert('Perfil atualizado!')
  }

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    await addProject(data)
    e.currentTarget.reset()
    alert('Projeto adicionado!')
  }

  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    await addSkill(data)
    e.currentTarget.reset()
    alert('Conhecimento adicionado!')
  }

  return (
    <div className="container section-padding">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text">Painel de <span className="primary-gradient-text">Controle</span></h1>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))' }}>
          <ArrowLeft size={18} /> Voltar ao Site
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('profile')} className={`glass ${activeTab === 'profile' ? 'active-tab' : ''}`} style={tabStyle}>
          <User size={18} /> Perfil
        </button>
        <button onClick={() => setActiveTab('projects')} className={`glass ${activeTab === 'projects' ? 'active-tab' : ''}`} style={tabStyle}>
          <Briefcase size={18} /> Projetos
        </button>
        <button onClick={() => setActiveTab('skills')} className={`glass ${activeTab === 'skills' ? 'active-tab' : ''}`} style={tabStyle}>
          <Code size={18} /> Conhecimentos
        </button>
        <button onClick={() => setActiveTab('education')} className={`glass ${activeTab === 'education' ? 'active-tab' : ''}`} style={tabStyle}>
          <GraduationCap size={18} /> Formação
        </button>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} style={formStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Editar Perfil</h2>
            <div style={inputGroup}>
              <label>Nome</label>
              <input name="name" type="text" className="glass" style={inputStyle} defaultValue="behrsp" />
            </div>
            <div style={inputGroup}>
              <label>Bio</label>
              <textarea name="bio" className="glass" style={{ ...inputStyle, height: '100px' }} defaultValue="Desenvolvedor Full Stack..." />
            </div>
            <div style={inputGroup}>
              <label>Foto do Perfil (Upload do PC)</label>
              <input 
                type="file" 
                accept="image/*" 
                className="glass" 
                style={inputStyle} 
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setProfile({ ...profile, image: reader.result as string })
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <input type="hidden" name="image" value={profile.image || ''} />
              {profile.image && (
                <div style={{ marginTop: '1rem', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid hsl(var(--primary))' }}>
                  <img src={profile.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <small style={{ color: 'hsl(var(--muted-foreground))' }}>A imagem será salva diretamente no banco de dados. Limite: 1MB.</small>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={inputGroup}>
                <label>GitHub URL</label>
                <input name="github" type="text" className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>LinkedIn URL</label>
                <input name="linkedin" type="text" className="glass" style={inputStyle} />
              </div>
            </div>
            <button type="submit" className="glass" style={buttonStyle}>
              <Save size={18} /> Salvar Alterações
            </button>
          </form>
        )}

        {activeTab === 'projects' && (
          <form onSubmit={handleAddProject} style={formStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Adicionar Novo Projeto</h2>
            <div style={inputGroup}>
              <label>Título</label>
              <input name="title" type="text" required className="glass" style={inputStyle} />
            </div>
            <div style={inputGroup}>
              <label>Descrição</label>
              <textarea name="description" required className="glass" style={{ ...inputStyle, height: '80px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={inputGroup}>
                <label>URL do Vídeo (mp4)</label>
                <input name="videoUrl" type="text" className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>URL da Imagem (Capa)</label>
                <input name="imageUrl" type="text" className="glass" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={inputGroup}>
                <label>Status</label>
                <select name="status" className="glass" style={inputStyle}>
                  <option value="FINISHED">Finalizado</option>
                  <option value="ONGOING">Em Andamento</option>
                </select>
              </div>
              <div style={inputGroup}>
                <label>Tecnologias (separadas por vírgula)</label>
                <input name="techStack" type="text" className="glass" style={inputStyle} placeholder="Next.js, React, Prisma" />
              </div>
            </div>
            <button type="submit" className="glass" style={buttonStyle}>
              <Plus size={18} /> Adicionar Projeto
            </button>
          </form>
        )}

        {activeTab === 'skills' && (
          <form onSubmit={handleAddSkill} style={formStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Adicionar Conhecimento</h2>
            <div style={inputGroup}>
              <label>Nome do Sistema/Tecnologia</label>
              <input name="name" type="text" required className="glass" style={inputStyle} placeholder="Ex: SAP, Protheus, Node.js" />
            </div>
            <div style={inputGroup}>
              <label>Categoria</label>
              <select name="category" className="glass" style={inputStyle}>
                <option value="Sistemas de Gestão">Sistemas de Gestão</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Ferramentas">Ferramentas</option>
              </select>
            </div>
            <div style={inputGroup}>
              <label>Descrição Curta</label>
              <input name="description" type="text" className="glass" style={inputStyle} />
            </div>
            <button type="submit" className="glass" style={buttonStyle}>
              <Plus size={18} /> Adicionar Conhecimento
            </button>
          </form>
        )}

        {activeTab === 'education' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <form onSubmit={(e) => { e.preventDefault(); addCourse(Object.fromEntries(new FormData(e.currentTarget))); alert('Curso adicionado!'); }} style={formStyle}>
              <h3>Adicionar Curso</h3>
              <div style={inputGroup}>
                <label>Título</label>
                <input name="title" type="text" required className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>Plataforma</label>
                <input name="platform" type="text" required className="glass" style={inputStyle} />
              </div>
              <button type="submit" className="glass" style={buttonStyle}>Adicionar Curso</button>
            </form>

            <form onSubmit={async (e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              await addCertificate(data); 
              e.currentTarget.reset();
              alert('Certificado adicionado!'); 
            }} style={formStyle}>
              <h3>Adicionar Certificado</h3>
              <div style={inputGroup}>
                <label>Título</label>
                <input name="title" type="text" required className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>Emissor</label>
                <input name="issuer" type="text" required className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>Data</label>
                <input name="date" type="date" required className="glass" style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>Arquivo (Imagem/PDF)</label>
                <input 
                  type="file" 
                  accept="image/*,application/pdf" 
                  className="glass" 
                  style={inputStyle} 
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const hiddenInput = e.target.parentElement?.querySelector('input[name="fileData"]') as HTMLInputElement
                        if (hiddenInput) hiddenInput.value = reader.result as string
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                <input type="hidden" name="fileData" />
                <small style={{ color: 'hsl(var(--muted-foreground))' }}>Limite: 4MB.</small>
              </div>
              <button type="submit" className="glass" style={buttonStyle}>Adicionar Certificado</button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .active-tab {
          border-color: hsl(var(--primary)) !important;
          background: hsl(var(--primary) / 0.1) !important;
          color: hsl(var(--primary)) !important;
        }
      `}</style>
    </div>
  )
}

const tabStyle = {
  padding: '0.75rem 1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: '#fff',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.25rem',
}

const inputGroup = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '0.5rem',
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  outline: 'none',
  fontSize: '0.95rem',
  color: '#fff',
  width: '100%',
}

const buttonStyle = {
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  fontWeight: '600',
  marginTop: '1rem',
  background: 'hsl(var(--primary))',
  color: '#fff',
  border: 'none',
}
