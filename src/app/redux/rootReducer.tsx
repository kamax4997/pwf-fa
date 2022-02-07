import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import dashboardReducer from './slices/dashboard'

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings'],
}

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['tasks'],
}

const rootReducer = combineReducers({
  dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
})

export { rootPersistConfig, rootReducer }
