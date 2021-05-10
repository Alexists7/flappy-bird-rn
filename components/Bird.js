import React from "react";
import { View, Image } from "react-native";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 50;

  const birdImage = {
    uri:
      "https://raw.githubusercontent.com/kubowania/flappy-bird/master/flappy-bird.png",
  };

  return (
    <Image
      source={birdImage}
      style={{
        position: "absolute",
        flex: 1,
        resizeMode: "contain",
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}
    ></Image>
  );
};

export default Bird;
