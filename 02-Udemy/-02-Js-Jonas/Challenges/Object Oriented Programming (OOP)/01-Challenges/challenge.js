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

const car1 = new car('BMW', 95);
const car2 = new car('MERCEDES', 95);

console.log(car1)
car1.accelerate();
car1.brake();
