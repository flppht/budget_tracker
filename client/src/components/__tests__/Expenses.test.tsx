import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Expenses from "../Expenses";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import { Provider } from "react-redux";

const expenses = [
  {
    id: 56,
    type: "expense",
    title: "coffee",
    value: 10,
    location: "",
    username: "Filip",
    createdAt: "2024-03-21T14:15:35.000Z",
  },
];

afterEach(() => {
  cleanup();
});

jest.mock("../../hooks/useTransactions", () => ({
  useTransactions: () => ({
    expenses: expenses,
    setExpenses: jest.fn(),
    isLoading: false,
    error: "",
  }),
}));

test("should map through expenses array", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Expenses />
      </BrowserRouter>
    </Provider>
  );

  const expensesComponent = screen.getByTestId("expenses");

  expect(expensesComponent).toBeInTheDocument();
  expect(expensesComponent).toHaveTextContent("coffee");
  expect(expensesComponent).not.toHaveTextContent("drink");
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Expenses />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
