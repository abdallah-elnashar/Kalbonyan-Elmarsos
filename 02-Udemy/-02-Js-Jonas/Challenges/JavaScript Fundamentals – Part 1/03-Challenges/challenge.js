const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;

if (scoreDolphins > scoreKoalas) {
  console.log(`Dolphins win`);
} else if (scoreKoalas > scoreDolphins) {
  console.log(`Koalas win`);
} else {
  console.log("There is a draw");
}
