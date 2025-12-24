const prisma = require("./prisma");

async function main() {
  const users = await prisma.usuario.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
