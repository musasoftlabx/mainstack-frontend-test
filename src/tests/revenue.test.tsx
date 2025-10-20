import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Revenue from "@/app/revenue/page";

// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
// import {http, HttpResponse} from 'msw'
// import {setupServer} from 'msw/node'

test("loads page", async () => {
  // ARRANGE
  render(<Revenue />);

  // ACT
  await userEvent.click(screen.getByText("Load Greeting"));
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});
