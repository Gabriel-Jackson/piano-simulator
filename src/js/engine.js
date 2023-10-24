const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");

const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audioVolume = 0.5;

const playTune = (key) => {
  let audio = new Audio();
  audio.src = `src/tunes/${key}.wav`;
  audio.volume = audioVolume;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);

  clickedKey.classList.add("active");

  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150)
};

const handleVolume = (e) => {
  audioVolume = e.target.value;
}

const showHideKeys = () => {
  pianoKeys.forEach(key => key.classList.toggle("hide"));
}

pianoKeys.forEach((key) => {
  key.addEventListener("click", ()=> playTune(key.dataset.key))
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if(mapedKeys.includes(e.key)){
    const pressedKey = document.querySelector(`[data-key="${e.key}"]`);

    
    if(!pressedKey.classList.contains("pressed")){
      playTune(e.key);
      pressedKey.classList.add("pressed");
    }
  }
});

document.addEventListener("keyup", (e) => {
  if(mapedKeys.includes(e.key)){
    const pressedKey = document.querySelector(`[data-key="${e.key}"]`);

    
    pressedKey.classList.remove("pressed");
  }
});

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);