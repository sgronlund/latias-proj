import "react-native-gesture-handler/jestSetup";
import React from "react";

jest.mock("react-navigation", () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
  SafeAreaView: ({ children }) => <>{children}</>,
}));

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});