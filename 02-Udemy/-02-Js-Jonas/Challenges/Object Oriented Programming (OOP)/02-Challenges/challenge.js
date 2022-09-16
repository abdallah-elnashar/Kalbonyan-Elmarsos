class carCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed)
    }
    brake() {
        this.speed -= 5;
        console.log(this.speed)
    }

    get speedUS() {
        return this.speed / 1.6
    }

    set speedUS(speed) {
        return this.speed = speed * 1.6
    }
}

const ford = new car('ford', 120)
