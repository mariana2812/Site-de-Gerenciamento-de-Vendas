import { AppError } from "../../error";
export const parseId = (value: string): number => {
  const id = Number(value);
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(id) || id < 1 || id > 2147483647) throw new AppError("ID invalido", 400);
  return id;
};
