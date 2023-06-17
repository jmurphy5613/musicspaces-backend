import Hapi from '@hapi/hapi'
import usersPlugin from './plugins/user'
import prismaPlugin from './plugins/prisma'
import spotifyPlugin from './plugins/spotify'

const server: Hapi.Server = Hapi.server({
    port: process.env.PORT || 3001,
    host: '0.0.0.0',
    "routes": {
        "cors": true
    }
})

const start = async ():Promise<Hapi.Server> => {
    await server.start()
    await server.register([usersPlugin, spotifyPlugin, prismaPlugin])
    
    console.log(`server running on port ${server.info.uri}`)

    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

start()
    .catch((err) => {
        console.log(err)
    })