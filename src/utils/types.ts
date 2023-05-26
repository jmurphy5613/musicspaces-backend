export interface UserCreatePayload {
    spotifyUsername: string
    musicspacesUsername: string
    accessToken: string
    refreshToken: string
    accessTokenExpiration: Date
}