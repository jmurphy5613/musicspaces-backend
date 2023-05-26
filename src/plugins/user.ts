import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'
import { UserCreatePayload } from '../utils/types'

const usersPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/users/get-all',
                handler: getUserHandler
            },
            {
                method: 'POST',
                path: '/users/create',
                handler: createUserHandler
            }
        ])
    }
}

const getUserHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app

    try {
        const users = await prisma.user.findMany()
        return res.response(users).code(200)
    }
    catch (err) {
        console.log(err)
        return Boom.badImplementation(err)
    }

}

const createUserHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app
    const payload = req.payload as UserCreatePayload
    
    try {
        const createdUser = await prisma.user.create({
            data: {
                spotifyUsername: payload.spotifyUsername,
                musicspacesUsername: payload.musicspacesUsername,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                accessTokenExpiration: payload.accessTokenExpiration
            }
        })
        return res.response(createdUser).code(201)
    }
    catch (err) {
        console.log(err)
        return Boom.badImplementation(err)
    }
}

export default usersPlugin