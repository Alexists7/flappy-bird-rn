import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";

export default function GameOver({ history }) {
  const [sound, setSound] = useState();

  async function playSwoosh() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/swoosh.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startReload = () => {
    history.push("/game");
    playSwoosh();
  };

  const backgroundImage = {
    uri: "https://wallpaperaccess.com/full/4622710.png",
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={startReload}>
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.image}>
            <Text style={styles.title}>Tap to start...</Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
});
