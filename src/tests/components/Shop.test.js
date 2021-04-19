import React from "react";
import Shop from "../../screens/components/Shop";
import { render } from "@testing-library/react-native";

describe("Test Suite for Shop", () => {
  test('check if balance is 0 if no balance is sent as prop"', () => {
    const { getByText } = render(<Shop />);
    const balanceText = getByText("0 $");
    expect(balanceText).toBeDefined();
  });

  test('Send prop and check for balance with sent prop as value', () => {
    const { getByText } = render(<Shop balance={800}/>);
    const balanceText = getByText("800 $");
    expect(balanceText).toBeDefined();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
