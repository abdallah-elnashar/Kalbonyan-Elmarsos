const checkDogs = (dogsJulia, dogsKate) => {
  const juliaArr = dogsJulia.slice();
  juliaArr.splice(0, 1);
  juliaArr.splice(-2);

  const both = juliaArr.concat(dogsKate);

  both.forEach((dog, i) => {
    if (dog < 3) {
      console.log(`Dog number ${i + 1} is still a puppy`);
    } else {
      console.log(`Dog number ${i + 1}
      is an adult, and is 5 years old`);
    }
  });
};

checkDogs([4, 9, 3, 2, 5], [4, 5, 7, 3, 9]);
