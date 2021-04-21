import React from "react";
import Toolbar from "../../screens/components/Toolbar";
import { render } from "@testing-library/react-native";

describe("Test Suite for Toolbar", () => {
  test('check if button exists with text "↶"', () => {
    const { getByText } = render(<Toolbar backButton={true} />);
    const goBackButton = getByText("↶");
    expect(goBackButton).toBeDefined();
  });

  test("check if button is non-existent if prop is missing", () => {
    const { queryByText } = render(<Toolbar />);
    expect(queryByText("↶")).toBeNull();
  });

  test("Send in title prop and check that the title exists", () => {
    var randomString = "FlaskLamp";
    const { getByText } = render(<Toolbar title={randomString} />);
    expect(getByText(randomString)).toBeDefined();
  });

  test("Send in no title prop and check for default title value", () => {
    const { getByText } = render(<Toolbar />);
    expect(getByText("")).toBeDefined();
  })

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
