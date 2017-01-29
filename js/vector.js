class Vect2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    // Add Vect To Vect
    addX (vect) {
        this.x += vect.x;
        return this;
    }
    
    addY (vect) {
        this.y += vect.y;
        return this;
    }

    add (vect) {
        this.addX(vect);
        this.addY(vect);
        return this;
    }

    // Add Integer To Vect
    addIntX (nb) {
        this.x += nb;
        return this;
    }

    addIntY (nb) {
        this.y += nb;
        return this;
    }

    addInt (nb) {
        this.addIntX(nb);
        this.addIntY(nb);
        return this;
    }

    // Sub Vect To Vect
    subX (vect) {
        this.x -= vect.x;
        return this;
    }

    subY (vect) {
        this.y -= vect.y;
        return this;
    }

    sub (vect) {
        this.subX(vect);
        this.subY(vect);
        return this;
    }

    // Sub Integer To Vect
    subIntX (nb) {
        this.x -= nb;
        return this;
    }

    subIntY (nb) {
        this.y -= nb;
        return this;
    }

    subInt (nb) {
        this.subIntX(nb);
        this.subIntY(nb);
        return this;
    }

    // Invert Vect
    invertX () {
        this.x *= -1;
        return this;
    }

    invertY () {
        this.y *= -1;
        return this;
    }

    invert () {
        this.invertX();
        this.invertY();
        return this
    }

    // Round at number
    round (number) {
        this.x = Math.round(this.x * number) / number;
        this.y = Math.round(this.y * number) / number;
        return this;
    }

    // Mult by
    mult (vect) {
        this.x *= vect.x;
        this.y *= vect.y;
        return this;
    }

    multBy (number) {
        this.x *= number;
        this.y *= number;
        return this;
    }

    // Calc
    length () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString () {
        return "x: "+this.x+"\ty: "+this.y;
    }
}
