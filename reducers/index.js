import { combineReducers } from "redux"

import login from './login'
import postList from './postList'

  const rootReducer = combineReducers({
      login: login,
      postList: postList,
  })

  export default rootReducer