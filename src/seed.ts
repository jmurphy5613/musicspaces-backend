import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})

    const sampleUser = await prisma.user.create({
        data: {
            spotify_username: "jmurphy5613",
            musicspaces_username: "john"
        }
    })
}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        prisma.$disconnect
    })