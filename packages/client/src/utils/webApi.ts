interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  msRequestFullscreen?: () => void
}

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
  msExitFullscreen?: () => void
}

export function toggleFullScreen(elem: ExtendedHTMLElement | null) {
  elem = elem ?? (document.documentElement as ExtendedHTMLElement)
  const htmlDocument = document as ExtendedDocument
  if (
    !htmlDocument.fullscreenElement &&
    !htmlDocument.mozFullScreenElement &&
    !htmlDocument.webkitFullscreenElement &&
    !htmlDocument.msFullscreenElement
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    }
  } else {
    if (htmlDocument.exitFullscreen) {
      htmlDocument.exitFullscreen()
    } else if (htmlDocument.msExitFullscreen) {
      htmlDocument.msExitFullscreen()
    } else if (htmlDocument.mozCancelFullScreen) {
      htmlDocument.mozCancelFullScreen()
    } else if (htmlDocument.webkitExitFullscreen) {
      htmlDocument.webkitExitFullscreen()
    }
  }
}