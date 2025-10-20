import { http } from "msw";

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API}transactions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ amount: 500 }]));
  }),
];
