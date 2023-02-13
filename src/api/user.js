import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllUsers = () => {
    return axios(`${apiUrl}/users`)
}

// READ -> Show
export const getOneUser = (userId) => {
    return axios(`${apiUrl}/users/${userId}`)
}
