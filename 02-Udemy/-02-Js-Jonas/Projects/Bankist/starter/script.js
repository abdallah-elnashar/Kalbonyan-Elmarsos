'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-04-01T17:01:17.194Z',
    '2022-04-02T23:36:17.929Z',
    '2022-04-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date) {

  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))
  const daysPassed = calcDaysPassed(new Date(), date)
  if (daysPassed === 0) return 'Today'
  if (daysPassed === 1) return 'Yesterday'
  if (daysPassed <= 7) return `${daysPassed} Days ago`
  else {
    const day = `${date.getDate()}`.padStart(2, 0)
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  }
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';


  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;


  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    const html = `
     <div class="movements__row">
                    <div class="movements__type movements__type--${type}">${i + 1} ${type}
                    </div>
                    <div class="movements__date">${displayDate}</div>
                    <div class="movements__value">${mov.toFixed(2)}€
                    </div>
                   </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}



displayMovements(account1)

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


const setLogOutTimer = function () {
  let time = 30;
  const tick = function () {
    let min = String(Math.floor(time / 60)).padStart(2, 0);
    let sec = String(Math.floor(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`
    if (time === 0) {
      clearInterval(timer)
      labelWelcome.textContent = `Log in to get started`
      containerApp.style.opacity = 0;
    }
    time--;
  }
  tick();
  const timer = setInterval(tick, 1000)
  return timer;
}

const updateUI = function (acc) {
  //display movements 
  displayMovements(acc)
  // display balance
  calcDisplayBalance(acc)
  //display summary
  calcDisplaySummary(acc)
}

let currentAccount, timer;
/////////// LOGGING IN
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)


  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message hello
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]} `
    containerApp.style.opacity = 100;

    /// CURRENT DATE 
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0)
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const min = `${now.getMinutes()}`.padStart(2, 0);
    const hour = `${now.getHours()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`
    //clear input field 
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    ////// log out

    if (timer) clearInterval(timer)
    timer = setLogOutTimer()
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


    currentAccount.movementsDates.push(new Date().toISOString())
    recieverAcc.movementsDates.push(new Date().toISOString())


    updateUI(currentAccount)
    ///reset timer 
    clearInterval(timer)
    timer = setLogOutTimer();
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.trunc(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount)


    currentAccount.movementsDates.push(new Date().toISOString())

    updateUI(currentAccount)
    ///reset timer 
    clearInterval(timer)
    timer = setLogOutTimer();
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
  displayMovements(currentAccount, !sorted)
  sorted = !sorted;
})
