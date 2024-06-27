import { gameReducer } from './gameReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: gameReducer,
})

export default store
