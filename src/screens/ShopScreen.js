import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Modal,
  Pressable,
} from "react-native";
import theme from "../styles/themes";
import Shop from "./components/Shop";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { LinearGradient } from "expo-linear-gradient";
import { Socket } from "../misc/Socket";

const prices = [
  { text: "Liten latte OKQ8", price: 100 },
  { text: "Stor latte OKQ8", price: 150 },
];

class PriceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  updateBalance = (price) => {
    Socket.on("returnUpdateSuccess", () => {});
    Socket.emit("changeBalance", Socket.id, price);
  };

  render() {
    const { modalVisible } = this.state;
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
              visible={false}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                //this.setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Do you want to make this purchace
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      this.setModalVisible(false),
                        this.updateBalance(this.props.price);
                    }}
                  >
                    <Text style={styles.textStyle}>BUY</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => {
                this.updateBalance(this.props.price);
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
    //this.updateBalance = this.updateBalance.bind(this);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Shop />
        <View style={styles.midsquare}>
          <Text style={styles.header}>──────── PRICE SHOP ────────</Text>
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
  },
  button_blue: {
    margin: theme.MARGIN_MEDIUM,
    borderRadius: theme.ROUNDING_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    padding: "7%",
    //paddingHorizontal: "15%",
    // flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
  },
  button_blue_text: {
    fontSize: "120%",
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  button_price: {
    borderRadius: theme.ROUNDING_SMALL,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    // marginLeft: "70%",
    width: "140%",
  },
  button_pink_text: {
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    fontSize: "120%",
    textAlign: "center",
    //  padding: "10%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
