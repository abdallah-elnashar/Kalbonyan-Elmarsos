const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// .2

const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));

console.log(dogSarah);

console.log(
  `sarah dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

//.3
const OwnersEatMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .map((dog) => dog.owners)
  .flat();

console.log(OwnersEatMuch);
const OwnersEatLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .map((dog) => dog.owners)
  .flat();

console.log(OwnersEatLittle);

//4.
console.log(` ${OwnersEatMuch.join(" and ")}'s dogs eat much`);
console.log(` ${OwnersEatLittle.join(" and ")}'s dogs eat much`);

//.5
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

//6.

const eatingOkay = (dog) =>
  dog.curFood > fog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(eatingOkay()));

//.7

console.log(dogs.filter(eatingOkay));

//.8

const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);
