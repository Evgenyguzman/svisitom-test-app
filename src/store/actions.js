import C from './constants';

class FakeAuthService{
  static async signIn(user){
    return new Promise((res, rej)=>{
      if(!user || !user.username || !user.password){
        res(false)
      }
      setTimeout(()=>{
        res(user.username === 'admin' && user.password === 'admin')
      }, 100)
    })
  }
}

export function signIn(data) {
  return async(dispatch, getState) => {
    try {
      const res = await FakeAuthService.signIn(data)
      console.log('Response is:', res)
      if(res) dispatch({ type: C.SIGN_IN, data })
      return res
    } catch (error) {
      console.error(error)
    }
  }
}

export function quit(data) {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: C.QUIT })
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateData(data) {
  return (dispatch, getState) => {
    dispatch({ type: C.UPDATE_ITEMS, data })
  }
}



