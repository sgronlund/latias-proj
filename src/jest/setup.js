import "react-native-gesture-handler/jestSetup";
import React from "react";

jest.mock("react-navigation", () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
  SafeAreaView: ({ children }) => <>{children}</>,
}));
