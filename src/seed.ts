import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})

    const newUser = await prisma.user.create({
        data: {
            spotifyUsername: 'john',
            musicspacesUsername: 'jmurphy5613',
            accessToken: 'blahblah',
            refreshToken: 'blahblahblah',
            accessTokenExpiration: new Date()
        }
    })

    console.log(newUser)
    
}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        prisma.$disconnect
    })