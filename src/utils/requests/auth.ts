import axios from 'axios'
import { SpotifyAuthResponse } from '../types'

export const refreshToken = async (refresh_token: string): Promise<SpotifyAuthResponse> => {
    try {
        const options = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            params: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID
            }
        }
    
        const res = await axios(options)
        console.log(res)
        return res.data as SpotifyAuthResponse
    } catch (error) {
        console.log(error)
        throw new Error('Failed to refresh token');
    }
}

export const getAccessToken = async (code: string): Promise<SpotifyAuthResponse> => {
    console.log(process.env.NEXT_PUBLIC_CLIENT_ID, process.env.CLIENT_SECRET)
    try {
        const options = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            params: {
                code: code,
                redirect_uri: 'https://musicspaces-git-feat-multiplayer-jmurphy5613.vercel.app',
                grant_type: 'authorization_code'
            }
        } 

        const res = await axios(options)
        return res.data as SpotifyAuthResponse
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get access token');
    }
}
