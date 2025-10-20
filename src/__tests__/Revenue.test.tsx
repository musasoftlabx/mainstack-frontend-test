import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Revenue from "@/app/revenue/page";
import App from "@/app/layout";

//test("renders correctly", async () => render(<App children={<div />} />));
test("renders correctly", async () => render(<Revenue />));

// test("transactions pulled from API", async () => {
//   render(<Revenue />);

//   const transactions = await screen.findAllByRole("listitem");
//   expect(transactions).toHaveLength(3);
// });
