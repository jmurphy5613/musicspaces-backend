import axios from 'axios';
import { Artist, UserInfo, Track, RecentlyPlayedTrack } from '../types';
import { get24HoursAgoUnix } from '../conversions';

export const getUserInfo = async (access_token: string): Promise<UserInfo> => {
    try {
        const options = {
            url: 'https://api.spotify.com/v1/me',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
        }

        const res = await axios(options)
        return res.data as UserInfo
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get profile info');
    }
}

export const getRecentlyPlayed = async (access_token: string): Promise<RecentlyPlayedTrack[]> => {

    try {
        const options = {
            url: 'https://api.spotify.com/v1/me/player/recently-played',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                limit: 50,
                after: get24HoursAgoUnix()
            }
        }

        const res = await axios(options)
        console.log(res)
        return res.data.items as RecentlyPlayedTrack[]
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get recently played');
    }
}

export const getTopSongs = async (access_token: string, time_range: string): Promise<Track[]> => {
    try {
        const options = {
            url: 'https://api.spotify.com/v1/me/top/tracks',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                limit: 10,
                time_range: time_range,
                offset: 0
            }
        }

        const res = await axios(options)
        return res.data.items as Track[]
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get top songs');
    }
}

export const getTopArtists = async (access_token: string, time_range: string): Promise<Artist[]> => {
    try {
        const options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                limit: 10,
                time_range: time_range,
                offset: 0
            }
        }

        const res = await axios(options)
        return res.data.items as Artist[]
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get top artists');
    }
}