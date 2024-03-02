const playSound = async (soundPath: string) => {
  try {
    let audioContext: AudioContext
    if (typeof AudioContext !== 'undefined') {
      audioContext = new AudioContext()
    } else {
      throw new Error('Невозможно включить звук из-за ограничений браузера')
    }

    const response: Response = await fetch(soundPath)
    const audioData: ArrayBuffer = await response.arrayBuffer()
    const audio = await audioContext.decodeAudioData(audioData)

    const playSound = audioContext.createBufferSource()
    playSound.buffer = audio
    playSound.connect(audioContext.destination)
    playSound.start(audioContext.currentTime)
  } catch {
    return
  }
}

/**звук высстрела */
export const shootSound = (soundFolder: string) => {
  playSound(soundFolder + 'shot.mp3')
}

/**звуку движения */
export const moveSound = (soundFolder: string) => {
  playSound(soundFolder + 'move.mp3')
}

/**звуку завершения хода */
export const stopSound = (soundFolder: string) => {
  playSound(soundFolder + 'stop.mp3')
}

/**звуку победы */
export const winSound = (soundFolder: string) => {
  playSound(soundFolder + 'win.mp3')
}

/**Звук смены игрока */
export const changeSound = (soundFolder: string) => {
  playSound(soundFolder + 'change.mp3')
}

/**Звук выбора таннка */
export const chooseSound = (soundFolder: string) => {
  playSound(soundFolder + 'choose.mp3')
}
