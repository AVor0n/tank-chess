//window.AudioContext = window.AudioContext || window.webkitAudioContext;

const playSound = async (soundPath: string) => {
  let audioContext: AudioContext
  if (typeof AudioContext !== 'undefined') {
    audioContext = new AudioContext()
  } /*else if (typeof webkitAudioContext !== 'undefined') {
    var audioCtx = new webkitAudioContext();
  }*/ else {
    throw new Error('Невозможно включить звук из-за ограничений браузера')
  }

  const response: Response = await fetch(soundPath)
  const audioData: ArrayBuffer = await response.arrayBuffer()
  const audio = await audioContext.decodeAudioData(audioData)

  const playSound = audioContext.createBufferSource()
  playSound.buffer = audio
  playSound.connect(audioContext.destination)
  playSound.start(audioContext.currentTime)
}

/**звук высстрела */
export const shootSound = () => {
  playSound('./sounds/shot.mp3')
}

/**звуку движения */
export const moveSound = () => {
  playSound('./sounds/move.mp3')
}

/**звуку завершения хода */
export const stopSound = () => {
  playSound('./sounds/stop.mp3')
}
