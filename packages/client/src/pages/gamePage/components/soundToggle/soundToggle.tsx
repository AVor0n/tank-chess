import { Switch } from '@gravity-ui/uikit'
import { useState } from 'react'
import { useAppDispatch } from 'reducers/hooks'
import { toggleSound } from 'reducers/sound'
import styles from './soundToggle.module.scss'
//import {shootSound} from './../../../../utils/webApiAudio'

interface SoundToggleProps {
  withSound?: boolean
}

export const SoundToggle = ({ withSound }: SoundToggleProps) => {
  const dispatch = useAppDispatch()
  const [on, switchSound] = useState(withSound)

  const onToggleSound = (checked: boolean) => {
    switchSound(checked)
    dispatch(toggleSound(checked))
  }

  return (
    <div className={on ? styles.soundToggleContainerOn : styles.soundToggleContainerOff}>
      <Switch checked={on} onUpdate={checked => onToggleSound(checked)} />
    </div>
  )
}
