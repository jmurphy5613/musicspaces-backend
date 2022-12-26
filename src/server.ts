import Hapi from '@hapi/hapi'

const server: Hapi.Server = Hapi.server({
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost'
})

const start = async ():Promise<Hapi.Server> => {
    await server.start()
    
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