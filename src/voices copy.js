// const voiceSelect = document.createElement("select")
// const textInput = document.createElement("input")
// const previewButton = document.createElement("button")

// Get the list of available voices
let voices = []

function main() {
	//! Oddly this just stopped working
	//! It works if you run it in the console
	voices = speechSynthesis.getVoices()
	console.log("speechSynthesis:", speechSynthesis.getVoices())
	console.log("voices:", voices)

	// populateVoiceList()
	// if (speechSynthesis.onvoiceschanged !== undefined) {
	// 	speechSynthesis.onvoiceschanged = populateVoiceList
	// }
	// createForm()
}
main()

// function populateVoiceList() {
// 	sortVoiceList()

// 	for (let i = 0; i < voices.length; i++) {
// 		const option = document.createElement("option")
// 		option.textContent = `${voices[i].name} (${voices[i].lang})`

// 		option.setAttribute("data-lang", voices[i].lang)
// 		option.setAttribute("data-name", voices[i].name)
// 		voiceSelect.appendChild(option)
// 	}
// }

// function sortVoiceList() {
// 	for (let i = 0; i < voices.length; i++) {
// 		// if (voices[i].name === "Google US English" && voices[i].lang === "en-US") {
// 		// 	voices.unshift(voices[i])
// 		// 	break
// 		// }
// 	}
// }

// // Create a dropdown menu to select the voice
// function createForm() {
// 	const renderTarget = document.querySelector("main")

// 	console.log(voices)
// 	voices.forEach(voice => {
// 		console.log("voice:", voice)
// 		const option = document.createElement("option")
// 		option.textContent = `${voice.name} (${voice.lang})`
// 		option.value = voice.name
// 		voiceSelect.appendChild(option)
// 	})

// 	renderTarget.appendChild(voiceSelect)

// 	// Create a text input to enter the synthesis text
// 	textInput.type = "text"
// 	textInput.placeholder = "Enter text to synthesize"
// 	textInput.value = "Hello"
// 	renderTarget.appendChild(textInput)

// 	// Create a button to preview the synthesis output
// 	previewButton.textContent = "Preview"

// 	previewButton.onclick = () => {
// 		const utterance = new SpeechSynthesisUtterance(textInput.value)
// 		const selectedVoiceData = parseSelectedVoice(voiceSelect.value)
// 		const selectedVoice = voices.find(voice => {
// 			return voice.name === selectedVoiceData.name && voice.lang === selectedVoiceData.lang
// 		})

// 		utterance.voice = selectedVoice
// 		synth.speak(utterance)
// 	}

// 	renderTarget.appendChild(previewButton)
// }

// function parseSelectedVoice(voice) {
// 	let data = {
// 		name: "",
// 		lang: "",
// 	}
// 	let parseLang = false

// 	for (const ch of voice.split("")) {
// 		if (ch === ")") {
// 			continue
// 		}
// 		if (ch === "(") {
// 			parseLang = true
// 			continue
// 		}
// 		if (parseLang) {
// 			data.lang += ch
// 			continue
// 		}
// 		data.name += ch
// 	}

// 	return {
// 		name: data.name.trim(),
// 		lang: data.lang.trim(),
// 	}
// }
