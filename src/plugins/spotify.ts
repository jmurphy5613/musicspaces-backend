import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'

const spotifyPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/spotify/top-tracks/{musicspacesUsername}',
                handler: getTopTracksHandler
            }
        ])
    }
};

const getTopTracksHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app
    const musicspacesUsername = req.params.musicspacesUsername
    
}

export default spotifyPlugin;
