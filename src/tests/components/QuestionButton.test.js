import React from "react";
import QuestionButton from "../../screens/components/QuestionButton";
import { render } from "@testing-library/react-native";

describe("Test Suite for QuestionButton", () => {
  test('Check for element with text "?"', () => {
    const { getByText } = render(<QuestionButton/>)
    const questionButton = getByText("?");
    expect(questionButton).toBeDefined();
  })

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
