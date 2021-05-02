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
    Socket.on("updatedLB", (leaderboard) => {
      this.setState({ tableData: leaderboard });
      Socket.off("updatedLB");
    });
    Socket.emit("getLeaderboard");
  };

  componentDidMount() {
    this.generateScoreboard();
  }
  render() {
    const player1 = this.state.tableData[0];
    const player2 = this.state.tableData[1];
    const player3 = this.state.tableData[2];
    return (
      <View
        style={styles.main}
      >
        <DataTable>
          <LinearGradient colors={themes.BLUE_GRADIENT} style={{borderRadius: themes.ROUNDING_SMALL}}>
            <DataTable.Header style={styles.header}>
              <Text style={styles.headerText}>Top Players</Text>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>1</Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={styles.cell}
              >
                <Text style={styles.font}>{player1?.username}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>
                  {player1 ? Math.floor(player1.score).toString() + "p" : null}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>2</Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={styles.cell}
              >
                <Text style={styles.font}>{player2?.username}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>
                  {player2 ? Math.floor(player2.score).toString() + "p" : null}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>3</Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={styles.cell}
              >
                <Text style={styles.font}>{player3?.username}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                style={styles.cell}
              >
                <Text style={styles.font}>
                  {player3 ? Math.floor(player3.score).toString() + "p" : null}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
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
    fontSize: themes.FONT_SIZE_TINY,
    color: "white",
    fontFamily: themes.DEFAULT_FONT,
    fontSize: themes.FONT_SIZE_EXTRA_SMALL,
  },
  cell: {
    alignItems: "center", 
    justifyContent: "center",
  },
});

export default Scoreboard;
