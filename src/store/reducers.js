import C from './constants'
import { combineReducers } from 'redux'

const info = (state={}, action) => {
  switch(action.type){
    case C.GET_INFO:
      return action.data
    default:
      return state
  }
}

const items = (state = [], action) => {
  switch (action.type) {
    case C.UPDATE_ITEMS:
      return action.data
    default:
      return state
  }
}



const user = (state = {}, action) => {
  switch (action.type) {
    case C.SIGN_IN:
      return action.data
    case C.QUIT:
      return {}
    default:
      return state
  }
}


const table = combineReducers({
  info,
  items
})

const system = combineReducers({
  table
})

const mainReducer = combineReducers({
  system,
  user
})

export default mainReducer
