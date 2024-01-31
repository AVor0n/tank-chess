class NotificationService {
  private async checkPermission() {
    if (!window.Notification) {
      throw new Error('Браузер не поддерживает Notification API')
    }

    if (Notification.permission === 'default') {
      return Notification.requestPermission().then(permission => permission === 'granted')
    }

    return Notification.permission === 'granted'
  }

  public async show(title: string, options: NotificationOptions) {
    const canNotify = await this.checkPermission()
    return canNotify ? new Notification(title, options) : null
  }
}

const NotificationServiceInstance = new NotificationService()
export default NotificationServiceInstance
