import apiUrl from '../apiConfig'
import axios from 'axios'


//CREATE
// /comments/:goalId
export const createComment = (goalId, newComment) => {
    return axios({    
        url: `${apiUrl}/comments/${goalId}`,
        method: 'POST',
        data: {
            Comment: newComment
        }
    })
}

// DELETE
// /toys/:goalId/:commentId

export const deleteComment = (user, goalId, commentId) => {
    return axios({    
        url: `${apiUrl}/comments/${goalId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}