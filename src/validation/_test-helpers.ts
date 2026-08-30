export const file = (type: string, size = 1000) =>
  ({ type, size, name: "f" }) as unknown as File;
