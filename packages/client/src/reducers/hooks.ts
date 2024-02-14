import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type AppState, type AppDispatch } from 'store'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
