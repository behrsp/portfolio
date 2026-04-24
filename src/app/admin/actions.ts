'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Profile Actions
export async function updateProfile(data: any) {
  const profile = await prisma.profile.findFirst()
  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        name: data.name,
        bio: data.bio,
        image: data.image,
        github: data.github,
        linkedin: data.linkedin,
        email: data.email,
      },
    })
  } else {
    await prisma.profile.create({
      data: {
        name: data.name,
        bio: data.bio,
        image: data.image,
        github: data.github,
        linkedin: data.linkedin,
        email: data.email,
      },
    })
  }
  revalidatePath('/')
  revalidatePath('/admin')
}

// Project Actions
export async function addProject(data: any) {
  await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      imageUrl: data.imageUrl,
      status: data.status,
      techStack: data.techStack.split(',').map((s: string) => s.trim()),
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
    },
  })
  revalidatePath('/')
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath('/')
}

// Skill Actions
export async function addSkill(data: any) {
  await prisma.skill.create({
    data: {
      name: data.name,
      category: data.category,
      description: data.description,
    },
  })
  revalidatePath('/')
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } })
  revalidatePath('/')
}

// Course/Certificate Actions
export async function addCourse(data: any) {
  await prisma.course.create({
    data: {
      title: data.title,
      platform: data.platform,
      status: data.status,
    },
  })
  revalidatePath('/')
}

export async function addCertificate(data: any) {
  await prisma.certificate.create({
    data: {
      title: data.title,
      issuer: data.issuer,
      date: new Date(data.date),
      link: data.link,
      fileData: data.fileData,
    },
  })
  revalidatePath('/')
}
