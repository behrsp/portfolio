import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting seed with pg adapter...')
  
  // Clear existing data
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.profile.deleteMany()

  // Create Profile
  await prisma.profile.create({
    data: {
      name: 'behrsp',
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e soluções escaláveis.',
      email: 'oliveirasaopaulosp@gmail.com',
      github: 'https://github.com/behrsp',
      linkedin: 'https://linkedin.com/in/behrsp',
    },
  })

  // Create Skills
  await prisma.skill.createMany({
    data: [
      { name: 'SAP', category: 'Sistemas de Gestão', description: 'Experiência em manipulação e processos.' },
      { name: 'Protheus', category: 'Sistemas de Gestão', description: 'Domínio de rotinas e ERP.' },
      { name: 'React', category: 'Frontend', description: 'Criação de interfaces modernas.' },
      { name: 'Next.js', category: 'Frameworks', description: 'Aplicações SSR e estáticas.' },
    ],
  })

  // Create a sample project
  await prisma.project.create({
    data: {
      title: 'Meu Portfólio Premium',
      description: 'Este projeto que você está vendo agora!',
      status: 'FINISHED',
      techStack: ['Next.js', 'React', 'Prisma', 'NeonDB'],
      githubUrl: 'https://github.com/behrsp/portfolio',
    },
  })

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
