const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
  try {
    const Carlo = await prisma.MissionCommander.upsert({
      where: { name: "Carlo" },
      update: {},
      create: {
        name: "Carlo",
        lang: "Spanish",
        mission: "Node",
        enrollments: 1200,
      },
    });

    const Rodrigo = await prisma.MissionCommander.upsert({
      where: { name: "Rodrigo" },
      update: {},
      create: {
        name: "Rodrigo",
        lang: "Spanish",
        mission: "FrontEnd",
        enrollments: 1500,
      },
    });

    const Fernanda = await prisma.MissionCommander.upsert({
      where: { name: "Fernanda" },
      update: {},
      create: {
        name: "Fernanda",
        lang: "Spanish",
        mission: "Java",
        enrollments: 1300,
      },
    });

    const Luis = await prisma.MissionCommander.upsert({
      where: { name: "Luis" },
      update: {},
      create: {
        name: "Luis",
        lang: "Spanish",
        mission: "Onboarding",
        enrollments: 2000,
      },
    });

    console.log("Create 4 Mission Commanders");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
