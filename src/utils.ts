export const randomSort = (): number => Math.random() - 0.5;

export const sleep = (ms: number): Promise<any> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
