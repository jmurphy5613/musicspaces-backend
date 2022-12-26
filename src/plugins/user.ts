import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'

const usersPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/users/get-all',
                handler: getUserHandler
            }
        ])
    }
}

const getUserHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app

}

export default usersPlugin