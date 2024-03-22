import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Button from "../Button";

afterEach(() => {
  cleanup();
});

test("should render Button component", () => {
  render(<Button type="button">OK</Button>);

  const buttonElement = screen.getByTestId("button");

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("OK");
});

test("click event works on component", () => {
  const handleClick = jest.fn();

  render(
    <Button type="button" onClick={handleClick}>
      OK
    </Button>
  );

  const buttonElement = screen.getByTestId("button");

  fireEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("matches snapshot", () => {
  const tree = renderer.create(<Button type="button">OK</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});
