import React from "react";
import { Image } from "react-native";

const Obstacles = ({
  obstaclesLeft,
  obstacleWidth,
  obstacleHeight,
  gap,
  randomBottom,
}) => {
  const topPipeImage = {
    uri: "http://campbell.teachur.com/8thGradeFiles/Scratch/FlappyImages/pipeDown.png",
  };
  return (
    <>
      <Image
        source={topPipeImage}
        style={{
          position: "absolute",
          flex: 1,
          width: obstacleWidth,
          minHeight: 500,
          left: obstaclesLeft,
          bottom: randomBottom + obstacleHeight + gap,
          zIndex: 0,
          resizeMode: "cover",
        }}
      />
      <Image
        source={topPipeImage}
        style={{
          position: "absolute",
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
          zIndex: 0,
          transform: [{ rotate: "180deg" }],
          resizeMode: "cover",
        }}
      />
    </>
  );
};

export default Obstacles;
