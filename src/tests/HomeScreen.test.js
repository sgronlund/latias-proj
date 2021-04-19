import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";

describe("Test Suite for HomeScreen", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('check if button exists with text "SIGN UP"', () => {
    const { getByText } = render(<HomeScreen />);
    const registerButton = getByText("SIGN UP");
    expect(registerButton).toBeDefined();
  });

  test('Press "SIGN up" button', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
    const registerButton = getByText("SIGN UP");
    fireEvent.press(registerButton);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Sign");
  });

  test('check if button exists with text "LOG IN"', () => {
    const { getByText } = render(<HomeScreen />);
    const logInButton = getByText("LOG IN");
    expect(logInButton).toBeDefined();
  });

  test('Press "LOG IN" button', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
    const logInButton = getByText("LOG IN");
    fireEvent.press(logInButton);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("LogIn");
  });

  test('check if button exists with text "PLAY AS GUEST"', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
    const guestButton = getByText("PLAY AS GUEST");
    expect(guestButton).toBeDefined();
  });

  test('Press "PLAY AS GUEST" button', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
    const guestButton = getByText("PLAY AS GUEST");
    fireEvent.press(guestButton);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("GameScreen");
  });

  test('check if button exists with text "GO TO SETTINGS"', () => {
    const { getByText } = render(<HomeScreen />);
    const settingsButton = getByText("GO TO SETTINGS");
    expect(settingsButton).toBeDefined();
  });

  test('Press "GO TO SETTINGS" button', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);
    const settingsButton = getByText("GO TO SETTINGS");
    fireEvent.press(settingsButton);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Settings");
  });
});
