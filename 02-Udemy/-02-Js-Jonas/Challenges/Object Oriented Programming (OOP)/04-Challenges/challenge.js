class carCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return (this.speed = speed * 1.6);
  }
}

class EVCL extends carCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeTo(chargeTo) {
    this.charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    return this;
  }
}

const rivian = new EVCL('rivian', 120, 23);

console.log(rivian);
rivian.accelerate().brake().chargeTo(50);
console.log(rivian);
