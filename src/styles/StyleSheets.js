import {StyleSheet} from "react-native";
import theme from './themes.js'


const styleSheets = StyleSheet.create({
    MainContainer: 
    {   
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.PURPLE,
    },
    Input: {
        height: 40,
        margin: 12,
        width: '80%',
        borderWidth: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: theme.ROUNDING_EXTRA_SMALL
    },
    BlueButton:
    {
        width: '80%',
        height: '8%',
        alignItems: "center",
        backgroundColor: theme.LIGHT_BLUE,
        padding: theme.PADDING_SMALL,
        borderRadius: theme.ROUNDING_LARGE,
        margin: theme.MARGIN_MEDIUM,
        shadowOffset: theme.SHADOW_OFFSET,
        shadowOpacity: theme.SHADOW_OPACITY
    },
    PinkButton:
    {
        width: '80%',
        height: '8%',
        alignItems: "center",
        backgroundColor: theme.PINK,
        padding: theme.PADDING_SMALL,
        borderRadius: theme.ROUNDING_LARGE,
        margin: theme.MARGIN_MEDIUM,
        shadowOffset: theme.SHADOW_OFFSET,
        shadowOpacity: theme.SHADOW_OPACITY
    },
    ButtonText:
    {
        fontSize: theme.FONT_SIZE_SMALL,
        color: 'white',
        fontFamily: theme.DEFAULT_FONT
    },
    boarder: {
        width: 100 * 5,
        height: 100,
        backgroundColor: "#545985",
    },
    LoginText:
    {
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: 'white',
        fontFamily: theme.DEFAULT_FONT,
        alignSelf: "flex-start",
        marginLeft: 40
    }
});

export default styleSheets;