import React from "react";
import TitleContainer from "../../screens/components/TitleContainer";
import { render } from "@testing-library/react-native";

describe("Test Suite for TitleContainer", () => {
  test('check if element exists with text "REAL DEAL"', () => {
    const { getByText } = render(<TitleContainer />);
    const goBackButton = getByText("REAL DEAL");
    expect(goBackButton).toBeDefined();
  });

  test('check if element exists with text "─────────"', () => {
    const { getByText } = render(<TitleContainer />);
    const goBackButton = getByText("─────────");
    expect(goBackButton).toBeDefined();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
