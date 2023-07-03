import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})


    
}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        prisma.$disconnect
    })