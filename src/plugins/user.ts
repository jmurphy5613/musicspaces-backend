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
                handler: getUsersHandler
            },
            {
                method: 'POST',
                path: '/users/create',
                handler: createUserHandler
            },
            {
                method: 'GET',
                path: '/users/find-by-refresh-token/{refreshToken}',
                handler: findUserByRefreshTokenHandler
            }
        ])
    }
}

const getUsersHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app

    try {
        const users = await prisma.user.findMany()
        return res.response(users).code(200)
    }
    catch (err) {
        console.log(err)
        return Boom.badImplementation("could not get users")
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
        return Boom.badImplementation("could not create user")
    }
}

const findUserByRefreshTokenHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app
    const { refreshToken } = req.params
    
    try {
        const user = await prisma.user.findFirst({
            where: {
                refreshToken: refreshToken
            }
        })

        if (user) {
            return res.response(user).code(200)
        } else {
            return res.response().code(200)
        }
    } catch (err) {
        console.log(err)
        return Boom.badImplementation("Could not find user")
    }
}

export default usersPlugin