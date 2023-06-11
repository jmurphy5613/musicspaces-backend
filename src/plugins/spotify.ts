import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'
import { PrismaClient, User } from '@prisma/client';
import { refreshToken } from '../utils/requests/auth';
import { getTopSongs } from '../utils/requests/userData';

const spotifyPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
        server.route([
            {
                method: 'GET',
                path: '/spotify/top-tracks/{time_range}/{musicspacesUsername}',
                handler: getTopTracksHandler
            },
            {
                method: 'GET',
                path: '/spotify/top-artists/{time_range}/{musicspacesUsername}',
                handler: getTopArtistsHandler
            }
        ])
    }
};

const handleRefreshTokens = async(user: User, prisma: PrismaClient) => {

    if(user.accessTokenExpiration < new Date()) {
        const refreshedToken = await refreshToken(user.refreshToken)
        
        const accessTokenExpiration = new Date()
        accessTokenExpiration.setSeconds(accessTokenExpiration.getSeconds() + refreshedToken.expires_in)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                accessToken: refreshedToken.access_token,
                accessTokenExpiration: accessTokenExpiration
            }
        });
    }
}

const getTopTracksHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app
    const musicspacesUsername = req.params.musicspacesUsername

    const user = await prisma.user.findUnique({
        where: {
            musicspacesUsername
        }
    });

    if (!user) {
        return Boom.notFound('User not found')
    }

    await handleRefreshTokens(user, prisma)

    const topTracks = await getTopSongs(user.accessToken, req.params.time_range)
    return res.response(topTracks).code(200)

}

const getTopArtistsHandler = async (req: Hapi.Request, res: Hapi.ResponseToolkit) => {
    const { prisma } = req.server.app
    const musicspacesUsername = req.params.musicspacesUsername

    const user = await prisma.user.findUnique({
        where: {
            musicspacesUsername
        }
    });

    if (!user) {
        return Boom.notFound('User not found')
    }

    await handleRefreshTokens(user, prisma)

    const topArtists = await getTopSongs(user.accessToken, req.params.time_range)
    return res.response(topArtists).code(200)
}

export default spotifyPlugin;
