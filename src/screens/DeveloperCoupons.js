import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import { Socket, initDeveloperCouponSockets } from "../misc/Socket";

/**
 * @summary This screen is where the developer can submit
 * questions to the news quiz
 */
class DeveloperCoupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponName: "",
      price: "",
    };
  }

  /**
   * @function
   * @summary Updates the state of the couponName when the user inputs text
   * @param {String} text text to update couponName to
   */
  handleCouponName = (text) => {
    this.setState({ couponName: text });
  };

  /**
   * @function
   * @summary Updates the state of price when the user inputs text
   * @param {String} text text to update price to
   */
  handlePrice = (text) => {
    this.setState({ price: text });
  };

  /**
   * @function
   * @summary Tells the server that a developer is submitting
   * a coupon
   */
  handleSubmitCoupon = () => {
    const couponName = this.state.couponName;
    const price = parseInt(this.state.price);
    if (!couponName || !price) return alert("Du har lämnat blanka fält!");
    initDeveloperCouponSockets();
    Socket.emit("addCoupon", couponName, price);
  };

  /**
   * @function
   * @summary Tells the server to remove articles for the
   * current week
   */
  resetCoupons = () => {
    Socket.emit("resetCoupons");
    alert("Kupongerna har återställts!");
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.InputContainer}>
          <Text style={styleSheets.inputHeader}>Namn på kupongen:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Kupongens namn"
            onChangeText={this.handleCouponName}
          />
          <Text style={styleSheets.inputHeader}>Pris:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Pris"
            onChangeText={this.handlePrice}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.handleSubmitCoupon}
        >
          <Text style={styleSheets.ButtonText}>SKICKA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.resetCoupons}
        >
          <Text style={styleSheets.ButtonText}>ÅTERSTÄLL KUPONGER</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ResetContainer: {
    height: "20%",
    width: "100%",
  },
  InputContainer: {
    width: "95%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
});

export default DeveloperCoupons;
