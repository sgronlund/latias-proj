import React from "react";
import Toolbar from "../screens/components/Toolbar";
import { render, fireEvent } from "@testing-library/react-native";

test('check if button exists with text "GO BACK"', () => {
  const { getByText } = render(<Toolbar />);
  const goBackButton = getByText("GO BACK");
  expect(goBackButton).toBeDefined();
});

afterAll(() => {
  jest.restoreAllMocks();
});
