const total = [];
const tips = [];
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  total.push(calcTip(bills[i] + bills[i]));
}
