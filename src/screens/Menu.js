import React from "react";
import { styleSheets } from "../styles/StyleSheets";
import { View } from "react-native";

function Menu(props) {
  return (
    <View style={styleSheets.background}>
      <View style={styleSheets.boarder}></View>
    </View>
  );
}

export default Menu;
