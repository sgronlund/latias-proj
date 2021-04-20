import { Audio } from "expo-av";

let loadButtonSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/button.mp3")
  );
  return sound;
};

let playButtonSound = (sound) => {
  sound.playAsync();
};

export { loadButtonSound, playButtonSound };
