import React from "react";
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Button,
  View,
  ImageBackground,
} from "react-native";

export default function Start({ history }) {
  const backgroundImage = {
    uri: "https://wallpaperaccess.com/full/4622710.png",
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => history.push("/game")}>
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
