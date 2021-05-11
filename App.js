import React from "react";
import { NativeRouter, Route } from "react-router-native";
import {} from "react-native";
import Start from "./components/Start";
import Game from "./components/Game";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Route path="/" exact component={Start} />
        <Route path="/game" exact component={Game} />
      </NativeRouter>
    </>
  );
}
