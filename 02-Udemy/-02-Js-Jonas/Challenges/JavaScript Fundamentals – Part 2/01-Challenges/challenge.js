const calcAverage = (a, b, c) => {
  return (a + b + c) / 3;
};

const dolphinsAvg = calcAverage(44, 23, 71);
const koalasAvg = calcAverage(65, 54, 49);

const checkWinner = (koalasAvg, dolphinsAvg) => {
  if (koalasAvg >= 2 * dolphinsAvg) {
  } else {
    console.log(`Dolpins win (${dolphinsAvg} vs. ${koalasAvg})`);
  }
};
