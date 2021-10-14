const getDaysApart = (currentDate: number, startDate: number) => {
  return Math.round(((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1);
};

export default getDaysApart;