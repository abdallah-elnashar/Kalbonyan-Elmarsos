const calcAverageHumanAge = (ages) => {
  ages
    .map((age) => {
      if (age <= 2) {
        return 2 * age;
      } else {
        return 16 + 4 * age;
      }
    })
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  console.log(ages);
  return ages;
};
const avg = calcAverageHumanAge([5, 2, 4, 1, 15]);
