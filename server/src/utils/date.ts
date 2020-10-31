/*
* Returns yesterday
* */
export const yesterday: Function = (): Date => {
  const today: Date = new Date(Date.now());
  return new Date(today.setDate(today.getDate() - 1));
};
