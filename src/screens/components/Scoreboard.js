import React from "react";
import { Text, StyleSheet, View} from "react-native";
import { DataTable } from 'react-native-paper';
import themes from "../../styles/themes.js"
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
          {username: '', score: ''},
          {username: '', score: ''},
          {username: '', score: ''}
          ]
        };
      }

    generateScoreboard = () => {
      Socket.on('updatedLB', (leaderboard) => {
        console.log(leaderboard);
        this.setState({tableData: leaderboard});
        Socket.off('updatedLB');
      });
      Socket.emit('getLeaderboard')
    }

    componentDidMount() {
      this.generateScoreboard();
    }
  render() {
    return (
        <View style={{width: '80%', alignItems: 'center', height: '100%'}}>
        <LinearGradient colors={themes.BLUE_GRADIENT} style={styles.main, {width: '90%', alignItems: 'center', borderRadius: 15, height: '100%'}}>
          <DataTable style= {styles.main}>
            <DataTable.Header style={{height: '30%', justifyContent: 'center'}}>
                <Text style={styles.header}>Top Players</Text>
            </DataTable.Header>
        
            <DataTable.Row style={{height: '22%'}}>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>1</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{this.state.tableData[0]?.username}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{Math.floor(this.state.tableData[0]?.score).toString() + 'p'}</Text>
                </DataTable.Cell>
            </DataTable.Row>
        
            <DataTable.Row style={{height: '22%'}}>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>2</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{this.state.tableData[1]?.username}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{Math.floor(this.state.tableData[1]?.score).toString() + 'p'}</Text>
                </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{height: '22%'}}>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.font}>3</Text>
                  </DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{this.state.tableData[2]?.username}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.font}>{Math.floor(this.state.tableData[2]?.score).toString() + 'p'}</Text>
                </DataTable.Cell>
            </DataTable.Row>
            </DataTable>
            </LinearGradient>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    main : {
        borderRadius: 15,
        border: '5px',
        borderColor: 'black',
        height: '100%'
    },
    header : {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: themes.FONT_SIZE_SMALL,
        fontFamily: themes.DEFAULT_FONT,
        height: '100%',
        marginTop: '2%'
    },
    font : {
      color: 'white', 
      fontFamily: themes.DEFAULT_FONT, 
      fontSize: themes.FONT_SIZE_EXTRA_SMALL
    }
});

export default Scoreboard;