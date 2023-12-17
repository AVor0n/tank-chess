import { type FormEvent, useState } from 'react'
import { URL_RESOURCES } from '@utils/constants'
import userService from '../service'
import noAvatar from '@assets/images/no_avatar.svg'
import styles from './avatar.module.scss'

interface AvatarProps {
  url: string | null
}

export const Avatar = ({ url }: AvatarProps) => {
  const defaultLink = url ? `${URL_RESOURCES}/${url}` : noAvatar
  const [link, setLink] = useState(defaultLink)
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const files = (event.target as HTMLInputElement).files
    if (files) {
      formData.append('avatar', files?.[0])
      userService.changeAvatar(formData, data => setLink(data.avatar))
    }
  }

  return (
    <div className={styles.avatar}>
      <label htmlFor="upload-photo">
        <img src={link} alt="" />
      </label>
      <input type="file" name="avatar" id="upload-photo" onChange={onChange} className={styles.upload} />
    </div>
  )
}
