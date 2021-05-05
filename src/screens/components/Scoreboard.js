import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import themes from "../../styles/themes.js";
import { LinearGradient } from "expo-linear-gradient";
import { Socket } from "../../misc/Socket";

/**
 * @summary this is a scoreboard displaying the current top players
 */
class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        { username: "", score: "" },
        { username: "", score: "" },
        { username: "", score: "" },
      ],
    };
  }

  generateScoreboard = () => {
    Socket.on("updateLeaderboard", (leaderboard) => {
      this.setState({ tableData: leaderboard });
      Socket.off("updatedLeaderboard");
    });
    Socket.emit("getLeaderboard", this.props.type);
  };

  componentDidMount() {
    this.generateScoreboard();
  }

  render() {
    const type = this.props.type;
    const rows = this.state.tableData.map((user,index) => (
      <DataTable.Row key={index}>
        <DataTable.Cell
          numeric
          style={{ alignItems: "center", justifyContent: "center", flexGrow: 3 }}
        >
          <Text style={styles.font}>{index+1}</Text>
        </DataTable.Cell>
        <DataTable.Cell
          style={{ alignItems: "center", justifyContent: "center", flexGrow: 3 }}
        >
          <Text style={styles.font}>{user.username}</Text>
        </DataTable.Cell>
        <DataTable.Cell
          numeric
          style={{ alignItems: "center", justifyContent: "center" , flexGrow: 3}}
        >
          <Text style={styles.font}>
            {type === "newsq" ? Math.floor(user.score).toString() + "p" : Math.floor(user.scoreArticle).toString() + "p"}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      ))

    return (
      <View
        style={styles.main}
      >
        <DataTable>
          <LinearGradient colors={themes.BLUE_GRADIENT} style={{borderRadius: themes.ROUNDING_SMALL}}>
            <DataTable.Header style={styles.header}>
              <Text style={styles.headerText}>Topplista</Text>
            </DataTable.Header>

            {rows.splice(0, 3)}
            
          </LinearGradient>
        </DataTable>
      </View>
    );
  }
}


const height = Dimensions.get("window").height;

global.responsive = {
  height: height/12
};

const styles = StyleSheet.create({
  main: {
    borderRadius: themes.ROUNDING_EXTRA_SMALL,
    width: "80%"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: responsive.height
  },
  headerText: {
    fontSize: themes.FONT_SIZE_EXTRA_SMALL,
    color: "white"
  },
  font: {
    color: "white",
    fontFamily: themes.DEFAULT_FONT,
    fontSize: themes.FONT_SIZE_TINY,
  },
  cell: {
    alignItems: "center", 
    justifyContent: "center",
  },
});

export default Scoreboard;
