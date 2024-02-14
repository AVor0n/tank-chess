import { type FormEvent } from 'react'
import { URL_RESOURCES } from '@utils/constants'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { api } from 'reducers/api'
import noAvatar from '@assets/images/no_avatar.svg'
import styles from './avatar.module.scss'

interface AvatarProps {
  url: string | null
}

export const Avatar = ({ url }: AvatarProps) => {
  const [changeAvatar, { error }] = api.useChangeAvatarMutation()
  useApiErrorToast(error)

  const link = url ? `${URL_RESOURCES}/${url}` : noAvatar

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const files = (event.target as HTMLInputElement).files
    if (files) {
      formData.append('avatar', files[0])
      changeAvatar(formData)
    }
  }

  return (
    <div className={styles.avatar}>
      <label className={styles.label} htmlFor="upload-photo">
        <img src={link} alt="" />
      </label>
      <input type="file" name="avatar" id="upload-photo" onChange={onChange} className={styles.upload} />
    </div>
  )
}
