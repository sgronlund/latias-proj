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
import styleSheets from "../styles/StyleSheets";
import { LinearGradient } from "expo-linear-gradient";
import { Socket } from "../misc/Socket";
import themes from "../styles/themes";
import QRCode from "react-native-qrcode-svg";

class PriceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, showCode: false };
  }

  updateBalance = (price) => {
    Socket.emit("changeBalance", Socket.id, price);
    Socket.on("returnUpdateSuccess", () => {
      this.setState({ showCode: true, modalVisible: false });
    });
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
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
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Är du säker på att du vill göra det här köpet? (Koden kommer
                    behöva användas direkt)
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonBuy]}
                    onPress={() => {
                      this.updateBalance(this.props.price);
                      this.setModalVisible(false);
                    }}
                  >
                    <Text style={styles.textStyle}>KÖP</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>AVBRYT</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showCode}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCode: false });
                  }}
                >
                  <View style={styles.modalView}>
                    <QRCode
                      size={width}
                      logoSize={45}
                      value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      logoBackgroundColor="transparent"
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
    this.state = {coupons: []};
  }

  
  componentDidMount() {
    Socket.on("getCouponsSuccess", (coupons) => {
      this.setState({coupons: coupons});
    })
    Socket.emit("getCoupons");
  }

  render() {
    const coupons = this.state.coupons;

    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Shop />
        <View style={styles.midsquare}>
          <Text style={styles.header}>─────── BUTIK ───────</Text>
          <View style={{ width: "100%" }}>
          {coupons.length > 0 ? coupons.map((item, index) => (
              <PriceButton
                key={"price" + index}
                text={item.name}
                price={item.price}
                onPressBuy={this.updateBalance}
              />
            )) : <Text style={styles.Text}>No coupons available at this time.</Text>}
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
    padding: theme.PADDING_LARGE
  },
  header: {
    justifyContent: "flex-start", //y-led
    alignItems: "center",
    color: theme.LIGHT_BLUE,
    marginBottom: theme.MARGIN_MEDIUM,
    fontSize: theme.FONT_SIZE_TINY,
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
    fontSize: theme.FONT_SIZE_TINY,
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
    fontSize: theme.FONT_SIZE_TINY,
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
  Text: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    textAlign: "center",
  }
});
