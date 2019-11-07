import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers'
import storeData from './initialState'
import thunkMiddleware from 'redux-thunk'

const logger = store => next => action => {
  let result = next(action)
  if(action.type) {
    console.groupCollapsed("dispatching", action.type)
    console.log('action', action)
    console.log('next state', store.getState())
    console.groupEnd()
  }
  return result
}

const saver = store => next => action => {
  let result = next(action)
  localStorage['redux'] = JSON.stringify(store.getState()) 
  return result
}

const storeFactory = (initialState=storeData) => {
  return applyMiddleware(thunkMiddleware, logger, saver)(createStore)(
    mainReducer,
    (localStorage['redux']) ? JSON.parse(localStorage['redux']) : initialState
  )
} 

export default storeFactory