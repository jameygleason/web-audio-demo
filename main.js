const audio = document.querySelector("audio")
const recursion = document.querySelector(".recursion")
const asyncLoop = document.querySelector(".async-loop")
const recursionTimeout = document.querySelector(".recursion-timeout")
const recursionSpeech = document.querySelector(".recursion-speech")
const recursionAudioSpeech = document.querySelector(".recursion-audio-speech")
const asyncAudioSpeech = document.querySelector(".async-audio-speech")

// Recursion
recursion.addEventListener("click", () => {
	function repeat(i) {
		const next = () => {
			if (i >= 5 - 1) {
				return
			}
			audio.removeEventListener("ended", next)
			repeat(i + 1)
		}

		audio.addEventListener("ended", next)
		audio.play()
	}
	repeat(0)
})

// Async Loop
asyncLoop.addEventListener("click", async () => {
	for (let i = 0; i < 5; i++) {
		const resume = new CustomEvent("resume")
		const dispatcher = () => {
			audio.dispatchEvent(resume)
		}
		audio.addEventListener("ended", dispatcher)
		audio.play()
		await pause(audio, "resume")
		audio.removeEventListener("ended", dispatcher)
	}
})

// Recursion With Timeout
recursionTimeout.addEventListener("click", () => {
	function repeat(i) {
		const next = () => {
			if (i >= 5 - 1) {
				return
			}
			audio.removeEventListener("ended", next)
			setTimeout(() => {
				repeat(i + 1)
			}, 1000) // Zero timeout seems to work on Safari, but defeats the purpose.
		}

		audio.addEventListener("ended", next)
		audio.play()
	}
	repeat(0)
})

// Recursion With Speech Synthesis
recursionSpeech.addEventListener("click", () => {
	const utterance = new SpeechSynthesisUtterance("Hello")
	function repeat(i) {
		const next = () => {
			if (i >= 5 - 1) {
				return
			}
			utterance.removeEventListener("end", next)
			repeat(i + 1)
		}

		utterance.addEventListener("end", next)
		speechSynthesis.speak(utterance)
	}
	repeat(0)
})

function pause(elm, event) {
	return new Promise(resolve => {
		elm.addEventListener(event, () => {
			resolve()
		})
	})
}

// Recursion With Audio and Speech Synthesis
recursionAudioSpeech.addEventListener("click", () => {
	const utterance = new SpeechSynthesisUtterance("Hello")
	function repeat(i) {
		const next = () => {
			if (i >= 5 - 1) {
				return
			}
			audio.removeEventListener("ended", next)
			utterance.removeEventListener("end", next)
			repeat(i + 1)
		}

		audio.addEventListener("ended", next)
		audio.play()

		utterance.addEventListener("end", next)
		speechSynthesis.speak(utterance)
	}
	repeat(0)
})

// Simulate sequential audio
// Recursion With Audio and Speech Synthesis
recursionAudioSpeech.addEventListener("click", () => {
	const utterance = new SpeechSynthesisUtterance("Hello")
	function repeat(i) {
		console.log("CALLED:", i)

		const next = () => {
			console.log("NEXT:", i)
			if (i >= 5 - 1) {
				return
			}
			audio.removeEventListener("ended", speak)
			utterance.removeEventListener("end", next)
			repeat(i + 1)
		}

		const speak = () => {
			console.log("SPEAK:", i)

			utterance.addEventListener("end", next)
			speechSynthesis.speak(utterance)
		}

		console.log("AUDIO:", i)
		audio.addEventListener("ended", speak)
		audio.play()
	}
	repeat(0)
})

// Recursion With Audio, Speech Synthesis, and Delay
// TODO
recursionAudioSpeech.addEventListener("click", () => {
	const utterance = new SpeechSynthesisUtterance("Hello")
	function repeat(i) {
		console.log("CALLED:", i)

		const next = () => {
			console.log("NEXT:", i)
			if (i >= 5 - 1) {
				return
			}
			audio.removeEventListener("ended", speak)
			utterance.removeEventListener("end", next)
			repeat(i + 1)
		}

		const speak = () => {
			console.log("SPEAK:", i)

			utterance.addEventListener("end", next)
			speechSynthesis.speak(utterance)
		}

		console.log("AUDIO:", i)
		audio.addEventListener("ended", speak)
		audio.play()
	}
	repeat(0)
})

// Async Loop With Audio and Speech Synthesis
asyncAudioSpeech.addEventListener("click", async () => {
	const utterance = new SpeechSynthesisUtterance("Hello")
	for (let i = 0; i < 5; i++) {
		const resume = new CustomEvent("resume")

		const audioDispatcher = () => {
			audio.dispatchEvent(resume)
		}
		audio.addEventListener("ended", audioDispatcher)
		audio.play()
		await pause(audio, "resume")
		audio.removeEventListener("ended", audioDispatcher)

		const speechDispatcher = () => {
			utterance.dispatchEvent(resume)
		}
		utterance.addEventListener("end", speechDispatcher)
		speechSynthesis.speak(utterance)
		await pause(utterance, "resume")
		utterance.removeEventListener("end", speechDispatcher)
	}
})

function pause(elm, event) {
	return new Promise(resolve => {
		elm.addEventListener(event, () => {
			resolve()
		})
	})
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function getDur(elm, fallback = 0) {
	let dur
	return new Promise(res => {
		for (let i = 0; i < 1000; i++) {
			if (elm.readyState >= 1) {
				dur = elm.duration
				break
			} else {
				let gotIt = false
				const func = () => {
					dur = elm.duration
					gotIt = true
					elm.removeEventListener("loadedmetadata", func)
				}
				elm.addEventListener("loadedmetadata", func)
				if (gotIt) {
					break
				}
			}
		}

		if (dur) {
			res(dur)
		} else {
			res(fallback)
		}
	})
}
