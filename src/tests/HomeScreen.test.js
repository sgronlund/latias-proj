import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen'

test('check if button exists with text "SIGN UP"', () => {
  const {getByText} = render(<HomeScreen/>);
  const registerButton = getByText('SIGN UP');
  expect(registerButton).toBeDefined();
})

test('check if button exists with text "LOG IN"', () => {
  const {getByText} = render(<HomeScreen/>);
  const logInButton = getByText('LOG IN');
  expect(logInButton).toBeDefined();
})

test('check if button exists with text "PLAY AS GUEST"', () => {
  const {getByText} = render(<HomeScreen/>);
  const guestButton = getByText('PLAY AS GUEST');
  expect(guestButton).toBeDefined();
})

test('check if button exists with text "GO TO SETTINGS"', () => {
  const {getByText} = render(<HomeScreen/>);
  const settingsButton = getByText('GO TO SETTINGS');
  expect(settingsButton).toBeDefined();
})