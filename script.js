const video = document.querySelector("video")
const textElem = document.querySelector("[data-text]")

async function setup() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.srcObject = stream

  video.addEventListener("playing", async () => {
    const Work = Tesseract.createWorker()
    await Work.load()
    await Work.loadLanguage("eng")
    await Work.initialize("eng")

    const canvass = document.createElement("canvas")
    canvass.width = video.width
    canvass.height = video.height

    document.addEventListener("keypress", async e => {
      if (e.code !== "Space") return
      canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height)
      const {
        data: { text },
      } = await Work.recognize(canvass)

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(text.replace(/\s/g, " "))
      )

      textElem.textContent = text
    })
  })
}

setup()
