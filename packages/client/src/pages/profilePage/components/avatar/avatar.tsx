import { type FormEvent } from 'react'
import { URL_RESOURCES } from '@utils/constants'
import { pending, result, changeAvatar } from 'reducers/user'
import store from 'store'
import userService from '../../../../service'
import noAvatar from '@assets/images/no_avatar.svg'
import styles from './avatar.module.scss'

interface AvatarProps {
  url: string | null
}

export const Avatar = ({ url }: AvatarProps) => {
  const link = url ? `${URL_RESOURCES}/${url}` : noAvatar
  // const [link, setLink] = useState(defaultLink)
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const files = (event.target as HTMLInputElement).files
    if (files) {
      formData.append('avatar', files?.[0])
      store.dispatch(pending())
      userService.changeAvatar(formData, data => {
        store.dispatch(changeAvatar(data.avatar))
        store.dispatch(result())
      })
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
