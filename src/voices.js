const renderTarget = document.querySelector("main")
const voiceSelect = document.createElement("select")
const textInput = document.createElement("input")
const previewButton = document.createElement("button")

// Get the list of available voices
let voices = []

function main() {
	populateVoiceList()

	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = populateVoiceList
	}

	createForm()
}
main()

function populateVoiceList() {
	voices = speechSynthesis.getVoices()
	sortVoices()

	for (let i = 0; i < voices.length; i++) {
		const option = document.createElement("option")
		option.textContent = `${voices[i].name} (${voices[i].lang})`

		option.setAttribute("data-lang", voices[i].lang)
		option.setAttribute("data-name", voices[i].name)
		voiceSelect.appendChild(option)
	}
}

function sortVoices() {
	let index
	for (let i = 0; i < voices.length; i++) {
		if (voices[i].name === "Google US English" && voices[i].lang === "en-US") {
			index = i
			break
		}
	}

	if (voices[index]) {
		voices.splice(0, 0, voices[index])
		voices.splice(index + 1, 1)
	}
}

function createForm() {
	// Create a dropdown menu to select the voice
	voices.forEach(voice => {
		const option = document.createElement("option")
		option.textContent = `${voice.name} (${voice.lang})`
		option.value = voice.name
		voiceSelect.appendChild(option)
	})

	renderTarget.appendChild(voiceSelect)

	// Create a text input to enter the synthesis text
	textInput.type = "text"
	textInput.placeholder = "Enter text to synthesize"
	textInput.value = "Hello"
	renderTarget.appendChild(textInput)

	// Create a button to preview the synthesis output
	previewButton.textContent = "Preview"

	previewButton.onclick = () => {
		const utterance = new SpeechSynthesisUtterance(textInput.value)
		const selectedVoiceData = parseSelectedVoice(voiceSelect.value)
		const selectedVoice = voices.find(voice => {
			return voice.name === selectedVoiceData.name && voice.lang === selectedVoiceData.lang
		})

		utterance.voice = selectedVoice
		speechSynthesis.speak(utterance)
	}

	renderTarget.appendChild(previewButton)
}

function parseSelectedVoice(voice) {
	let data = {
		name: "",
		lang: "",
	}
	let parseLang = false

	for (const ch of voice.split("")) {
		if (ch === ")") {
			continue
		}
		if (ch === "(") {
			parseLang = true
			continue
		}
		if (parseLang) {
			data.lang += ch
			continue
		}
		data.name += ch
	}

	return {
		name: data.name.trim(),
		lang: data.lang.trim(),
	}
}
