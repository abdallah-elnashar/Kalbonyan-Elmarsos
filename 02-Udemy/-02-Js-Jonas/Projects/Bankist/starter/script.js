'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';


  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : "withdrawal";
    const html = `
     <div class="movements__row">
                    <div class="movements__type movements__type--${type}">${i + 1} ${type}
                    </div>
                    <div class="movements__value">${mov.toFixed(2)}€
                    </div>
                   </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(account1.movements)

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0)
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`
}

calcDisplayBalance(account1);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes.toFixed(2)}€`

  const out = acc.movements.filter(mov => mov < 0).map(mov => mov * -1).reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${out.toFixed(2)}€`

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
}
calcDisplaySummary(account1);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
createUserNames(accounts);

const updateUI = function (acc) {
  //display movements 
  displayMovements(acc.movements)
  // display balance
  calcDisplayBalance(acc)
  //display summary
  calcDisplaySummary(acc)
}

let currentAccount;


btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)


  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message hello
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]} `
    containerApp.style.opacity = 100;
    //clear input field 
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    //display movements 


    updateUI(currentAccount)
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value)
  const recieverAcc = accounts.find(acc => acc.userName === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = ''

  if (amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.userName !== currentAccount.userName) {
    currentAccount.movements.push(-amount)
    recieverAcc.movements.push(amount)
    updateUI(currentAccount)

  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.trunc(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount)

    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault()
  if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
    //delete account
    accounts.splice(index, 1)
    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''
})


let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted;
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
///// CHALLENGE #1
// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const newDogsData = dogsJulia.slice(1, -2);
//   const newArr = newDogsData.concat(dogsKate);
//   for (const [i, e] of newArr.entries()) {
//     e >= 3 ? console.log(`Dog number ${i + 1} is an adult, and is ${e} years old`) : console.log(`Dog number ${i + 1} is still a puppy🐶`)
//   }
// }

// checkDogs(juliaData, kateData)


// CHALLENGE #2 

// //   Data 1: [5, 2, 4, 1, 15, 8, 3]
// //   Data 2: [16, 6, 10, 5, 6, 1, 4]
// const dogsAge1 = [5, 2, 4, 1, 15, 8, 3]
// const dogsAge2 = [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = function (ages) {
//   const newAge = ages.map(e => {
//     return e <= 2 ? 2 * e : 16 + e * 4;
//   }).filter(e => {
//     return e >= 18;
//   }).reduce((acc, cur, i, arr) => {

//     return acc + cur / arr.length;
//   }, 0)
//   console.log(newAge)
// }
// calcAverageHumanAge(dogsAge1);



// const account = function (acc) {
//   for (const name of acc) {
//     if (name.owner === 'Jessica Davis') console.log(name)
//   }
// }

// account(accounts);



// CHALLENGE #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

for (const e of dogs) {
  e.recommendedFood = e.weight ** 0.75 * 28;
  e.owners.includes('Sarah')
}



console.log(dogs)