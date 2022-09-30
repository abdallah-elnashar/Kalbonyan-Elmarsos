
const calcAverageHumanAge = (ages) => {
  const dogAge = ages.map((age) => {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + 4 * age;
    }
  });

  const adults = dogAge.filter((age) => age >= 18);

  console.log(adults);

  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15]);
