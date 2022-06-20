const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read-btn');
const toggleBtn = document.getElementById('toggle-btn');
const closeBtn = document.getElementById('close-btn');
const textPopup = document.getElementById('text-box');

const data = [
	{
		image: './images/water.jpg',
		text: "I'm thirsty",
	},
	{
		image: './images/angry.jpg',
		text: "I'm angry",
	},
	{
		image: './images/grandmother.jpg',
		text: "I want to go to grandmother",
	},
	{
		image: './images/happy.jpg',
		text: "I'm happy",
	},
	{
		image: './images/home.jpg',
		text: "I want to go home",
	},
	{
		image: './images/hungry.jpg',
		text: "I'm hungry",
	},
	{
		image: './images/hurt.jpg',
		text: "I'm hurt",
	},
	{
		image: './images/mother.jpg',
		text: "I want to go to mother",
	},
	{
		image: './images/outside.jpg',
		text: "I want to go outside",
	},
	{
		image: './images/sad.jpg',
		text: "I'm sad",
	},
  {
		image: './images/scared.jpg',
		text: "I'm scared",
	},
  {
		image: './images/tired.jpg',
		text: "I'm tired",
	}
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');
  box.classList.add('box-item')
  const {image, text} =  item;
  box.innerHTML = `
  <img src=${image} alt=${text} class="box-item__image"/>
  <p class="box-item__text">${text}</p>
  `;

  box.addEventListener('click', ()=> {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voicesList = [];

function getVoicesList() {
  voicesList = speechSynthesis.getVoices();

  voicesList.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voicesList.find((voice) => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoicesList);

toggleBtn.addEventListener('click', () => textPopup.classList.toggle('shown'));
closeBtn.addEventListener('click', () => textPopup.classList.remove('shown'));
voicesSelect.addEventListener('change', setVoice);
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
})

getVoicesList();
