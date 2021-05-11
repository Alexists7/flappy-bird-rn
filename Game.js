import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  DevSettings,
  ImageBackground,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";
import { Audio } from "expo-av";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [score, setScore] = useState(0);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [isGameOver, setIsGameOver] = useState(false);

  // wing code
  const [sound, setSound] = useState();

  async function playWing() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/wing.mp3")
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

  //point code

  async function playPoint() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/point.mp3")
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

  //hit code
  async function playHit() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/hit.mp3")
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

  //die code
  async function playDie() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/die.mp3")
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

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - 3);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      playWing();
    }
  };

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
      playPoint();
    }
  }, [obstaclesLeft]);

  // start second obstacles

  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore((score) => score + 1);
      playPoint();
    }
  }, [obstaclesLeftTwo]);

  //check for collisions
  useEffect(() => {
    console.log(obstaclesLeft);
    console.log(screenWidth / 2);
    console.log(obstaclesLeft > screenWidth / 2);
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log("game over");
      gameOver();
      setCollisions(true);
    }
  });

  const [collisions, setCollisions] = useState(false);

  useEffect(() => {
    collisions === true ? playHit() : null;
  }, [collisions]);

  useEffect(() => {
    collisions === true
      ? setTimeout(() => {
          playDie();
        }, 1000)
      : null;
  }, [collisions]);

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);
  };

  const startReload = () => DevSettings.reload();
  const backgroundImage = {
    uri: "https://wallpaperaccess.com/full/4622710.png",
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.image}>
            <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
            <Text style={styles.score}>{score}</Text>
            {isGameOver && (
              <Button
                title="Play again"
                onPress={startReload}
                color="#24D0E4"
                style={styles.button}
              />
            )}
            <Obstacles
              color={"red"}
              obstacleWidth={obstacleWidth}
              randomBottom={obstaclesNegHeight}
              obstacleHeight={obstacleHeight}
              gap={gap}
              obstaclesLeft={obstaclesLeft}
            />
            <Obstacles
              color={"green"}
              obstacleWidth={obstacleWidth}
              randomBottom={obstaclesNegHeightTwo}
              obstacleHeight={obstacleHeight}
              gap={gap}
              obstaclesLeft={obstaclesLeftTwo}
            />
            <View style={styles.bottom} />
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
  score: {
    zIndex: 2,
    color: "#fff",
    fontSize: 40,
    position: "absolute",
    top: "10%",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: "green",
    color: "#000",
  },
});
