// this is where api calls for the goal live 
import apiUrl from '../apiConfig'
import axios from 'axios'


//READ -> Index
export const getAllGoals = () => {
    return axios(`${apiUrl}/goals`)

}

// Read -> Show
export const getOneGoal = (id) => {
    return axios(`${apiUrl}/goals/${id}`)
}

// Create ( Create a goal)
export const createGoal = (user, newGoal) => {
    console.log('this is the user', user)
    console.log('this is the newGoal', newGoal)
    return axios({
        url: `${apiUrl}/goals`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { goal: newGoal }


    })
}

//Update (Change a goal)
export const updateGoal = (user, updatedGoal) => {
    return axios({
        url: `${apiUrl}/goals/${updatedGoal.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { goal: updatedGoal }
    })
}

//Update (Mark complete)
export const markGoalComplete = (user, updatedGoal, goalId) => {
    return axios({
        url: `${apiUrl}/goals/${goalId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { goal: updatedGoal }
    })
}


// Delete ( Remove a goal)
export const removeGoal = (user, goalId) => {
    return axios({
        url: `${apiUrl}/goals/${goalId}`,
        method: `DELETE`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

