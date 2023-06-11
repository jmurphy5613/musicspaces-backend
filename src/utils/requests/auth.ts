import axios from 'axios'
import { SpotifyAuthResponse } from '../types'

export const refreshToken = async (refresh_token: string): Promise<SpotifyAuthResponse> => {
    const options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        params: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }
    }

    const makeRequest = async () => {
        let result
        await axios(options)
        .then((res) => {
            result = res.data
            console.log(res)
        })
        .catch((err) => {
            console.log('err', err)
        })
        return result
    }

    return await makeRequest()
	
}