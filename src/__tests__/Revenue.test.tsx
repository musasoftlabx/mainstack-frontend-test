import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Revenue from "@/app/revenue/page";
import App from "@/app/layout";

test("renders correctly", async () => render(<Revenue />));

test("transactions pulled from API", async () => {
  const transactions = await screen.findAllByRole("listitem");
  expect(transactions).toHaveLength(7);
});

test("filter form", async () => {
  const filters = await screen.findAllByRole("menu");
  expect(filters).toBeVisible();
});

test("filter form", async () => {
  const filters = await screen.findAllByRole("menu");
  expect(filters).toBeVisible();
});
