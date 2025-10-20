import { http, HttpRequestHandler } from "msw";

export const handlers = [
  // http.get(
  //   `${process.env.NEXT_PUBLIC_API}transactions`,
  //   (req: HttpRequestHandler, res: HttpRequestHandler, ctx: any) => {
  //     return res(ctx.status(200), ctx.json([{ amount: 500 }]));
  //   }
  // ),
];
