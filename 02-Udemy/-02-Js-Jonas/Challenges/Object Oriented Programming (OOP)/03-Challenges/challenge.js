const car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed)
}
car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed)
}

const EV = function (make, speed, charge) {
    car.call(this, make, speed)
    this.charge = charge;
}

EV.prototype = Object.create(car.prototype);

EV.prototype.chargeTo = function (chargeTo) {
    this.charge = this.chargeTo
}

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
}

const tesla = new EV('tesla', 120, 23);
tesla.accelerate()
console.log(tesla)
