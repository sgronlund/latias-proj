import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import theme from "../styles/themes";
import Shop from "./components/Shop";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { LinearGradient } from "expo-linear-gradient";
import { Socket } from "../misc/Socket";
import themes from "../styles/themes";
import QRCode from "react-native-qrcode-svg";

const prices = [
  { text: "Liten latte OKQ8", price: 100 },
  { text: "Stor latte OKQ8", price: 150 },
];

class PriceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, showCode: false};
  }

  updateBalance = (price) => {
    console.log("bought")
    Socket.on("returnUpdatedStateInShop", () => {
      Socket.off("returnUpdatedStateInShop")
      this.setState({showCode: true, modalVisible: false})
    });
    Socket.emit("changeBalance", Socket.id, price);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible, showCode } = this.state;
    const width = Dimensions.get("window").width / 2;

    return (
      <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
        
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.button_blue_text}>{this.props.text}</Text>
          </View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Do you want to make this purchase? (The code will have to be
                    used now)
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonBuy]}
                    onPress={() => {
                      this.updateBalance(this.props.price);
                    }}
                  >
                    <Text style={styles.textStyle}>BUY</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showCode}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <TouchableOpacity onPress= {() => {this.setState({showCode: false})}}>
                <View style={styles.modalView}>
                  <QRCode
                    size={width}
                    logoSize={45}
                    value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    logoBackgroundColor='transparent'
                  />
                </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <LinearGradient
                colors={theme.PINK_GRADIENT}
                style={styles.button_price}
              >
                <Text style={styles.button_pink_text}>{this.props.price}€</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default class ShopScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Shop/>
        <QuestionButton />
        <View style={styles.midsquare}>
          <Text style={styles.header}>─────── PRICE SHOP ───────</Text>
          <View style={{ width: "100%" }}>
            {prices.map((price, index) => (
              <PriceButton
                key={"price" + index}
                text={price.text}
                price={price.price}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  
  midsquare: {
    backgroundColor: theme.DARK_PURPLE,
    marginTop: "10%",
    marginBottom: "20%",
    borderRadius: theme.ROUNDING_SMALL,
    flex: 1,
    alignItems: "center",
    width: "90%",
  },
  header: {
    justifyContent: "flex-start", //y-led
    alignItems: "center",
    color: theme.LIGHT_BLUE,
    margin: "10%",
    fontSize: theme.FONT_SIZE_TINY
  },
  button_blue: {
    margin: theme.MARGIN_MEDIUM,
    borderRadius: theme.ROUNDING_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    padding: "7%",
    flexDirection: "row",
  },
  button_blue_text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  button_price: {
    borderRadius: theme.ROUNDING_SMALL,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    width: "100%",
  },
  button_pink_text: {
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    textAlign: "center",
    padding: theme.PADDING_MEDIUM,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.MARGIN_SMALL,
  },
  modalView: {
    margin: theme.MARGIN_SMALL,
    backgroundColor: themes.PURPLE_LIGHT,
    borderRadius: theme.ROUNDING_SMALL,
    padding: theme.PADDING_LARGE,
    alignItems: "center",
  },
  button: {
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
    padding: theme.PADDING_MEDIUM,
    margin: theme.MARGIN_TINY,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonBuy: {
    backgroundColor: themes.PINK,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: theme.FONT_SIZE_TINY,
  },
  modalText: {
    marginBottom: theme.MARGIN_TINY,
    textAlign: "center",
    fontSize: theme.FONT_SIZE_TINY,
    color: "white",
    fontWeight: "bold",
  },
});
