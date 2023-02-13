// this is where api calls for the goal live 
import apiUrl from '../apiConfig'
import axios from 'axios'


//READ -> Indx
export const getAllGoals = () => { 
    return axios(`${apiUrl}/goals`)

}

// Read ->

// Create ( Create a goal)

//Update (Change a goal)

// Delete ( Remove a goal)

