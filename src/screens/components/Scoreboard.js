import React from "react";
import { Text, SafeAreaView, TouchableOpacity, StyleSheet} from "react-native";
import { DataTable } from 'react-native-paper';
import { withNavigation } from "react-navigation";
import styleSheets from "../../styles/StyleSheets";
import { sharedKey, Socket } from "../../misc/Socket";
//import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

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
          ],
          tableHead: ['Position', 'Username', 'Score']
          
        }
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
      console.log("hejsan");
      this.generateScoreboard();
    }
  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
          <DataTable style= {{backgroundColor: '#3E9EFE'}}>
            <DataTable.Header >
                <DataTable.Title style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableHead[0]}</DataTable.Title>
                <DataTable.Title style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableHead[1]}</DataTable.Title>
                <DataTable.Title style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableHead[2]}</DataTable.Title>
            </DataTable.Header>
        
            <DataTable.Row>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>1</DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[0]?.username}</DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[0]?.score}</DataTable.Cell>
            </DataTable.Row>
        
            <DataTable.Row>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>2</DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[1]?.username}</DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[1]?.score}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>3</DataTable.Cell>
                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[2]?.username}</DataTable.Cell>
                <DataTable.Cell numeric style={{alignItems: 'center', justifyContent: 'center'}}>{this.state.tableData[2]?.score}</DataTable.Cell>
            </DataTable.Row>
            </DataTable>
          </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

    Table : {
        color: "#3E9EFE"
    },
  
    Scoreboard: {
        width: "100%"
    }
  
});

export default withNavigation(Scoreboard);