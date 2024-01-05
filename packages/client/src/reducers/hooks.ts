import { type TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux'
import { type RootStateType, type AppDispatch } from 'store'

type DispatchFunc = () => AppDispatch
export const useSelector: TypedUseSelectorHook<RootStateType> = selectorHook
export const useDispatch: DispatchFunc = dispatchHook
