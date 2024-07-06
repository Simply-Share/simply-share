import { Plan } from '../db/app/index.js'

async function seedPlansToDb() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      slug: 'free',
      data: {
        simplyShareBanner: true,
        passwordProtectedLinks: false,
        qrCodeGeneration: true,
        analytics: false,
        customDomain: false,
        visitorsLimit: 5000,
        activeShareables: 1,
        storageLimit: 25, // mb
        numberOfActiveMembers: 1,
      },
    },
    {
      name: 'SoloPro',
      price: 4,
      slug: 'solopro',
      data: {
        simplyShareBanner: false,
        passwordProtectedLinks: true,
        qrCodeGeneration: true,
        analytics: true,
        customDomain: false,
        visitorsLimit: 10000,
        activeShareables: 1,
        storageLimit: 100, // mb
        numberOfActiveMembers: 1,
      },
    },
    {
      name: 'LaunchPad',
      price: 16,
      slug: 'launchpad',
      data: {
        simplyShareBanner: false,
        passwordProtectedLinks: true,
        qrCodeGeneration: true,
        analytics: true,
        customDomain: true,
        visitorsLimit: 100000,
        activeShareables: 5,
        storageLimit: 500, // mb
        numberOfActiveMembers: 1,
      },
    },
    {
      name: 'FreeFlow',
      price: 32,
      slug: 'freeflow',
      data: {
        simplyShareBanner: false,
        passwordProtectedLinks: true,
        qrCodeGeneration: true,
        analytics: true,
        customDomain: true,
        visitorsLimit: 500000,
        activeShareables: 10,
        storageLimit: 1000, // mb
        numberOfActiveMembers: 5,
      },
    },
  ]

  await Promise.all(
    plans.map(async (plan) => {
      await Plan.upsert(plan)
    })
  )

  if (process.env.DEV_ENV) {
    console.log('Plans seeded successfully')
  }
}

export default {
    seedPlansToDb
}
