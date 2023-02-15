import apiUrl from '../apiConfig'
import axios from 'axios'


//CREATE
// /comment/:goalId
export const createComment = (user, goalId, newComment) => {
    return axios({    
        url: `${apiUrl}/comment/${goalId}`,
        method: 'POST',
        data: {
            comment: newComment
        },
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// DELETE
// /comment/:goalId/:commentId

export const removeComment = (user, goalId, commentId) => {
    return axios({    
        url: `${apiUrl}/comment/${goalId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}