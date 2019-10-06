class Turtle {
    constructor(x, y, angle) {
        this.home_x = x;
        this.home_y = y;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.drawing = true;
    }

    command_list = {
        forward: this.forward,
        fd: this.forward,
        backward: this.backward,
        bk: this.backward,
        right: this.right,
        rt: this.right,
        left: this.left,
        lt: this.left,
        clearscreen: this.clearscreen,
        cs: this.clearscreen,
        penup: this.penup,
        pu: this.penup,
        pendown: this.pendown,
        pd: this.pendown,
        home: this.home,
        label: this.label,
        setxy: this.setxy,
    };

    interpret(commands) {
        for (let command of commands) {
            if (command[0] === 'repeat') {
                for (let _ = 0; _ < command[1]; _++) {
                    this.interpret(command[2]);
                }
            } else {
                this.command_list[command[0]].bind(this)(...command.slice(1));
            }
        }
    }

    forward(steps) {
        steps = parseInt(steps);
        let new_x = this.x + steps * cos(this.angle);
        let new_y = this.y + steps * sin(this.angle);
        if (this.drawing) {
            line(this.x, this.y, new_x, new_y);
        }
        this.x = new_x;
        this.y = new_y;
    }

    backward(steps) {
        steps = parseInt(steps);
        let new_x = this.x - steps * cos(this.angle);
        let new_y = this.y - steps * sin(this.angle);
        if (this.drawing) {
            line(this.x, this.y, new_x, new_y);
        }
        this.x = new_x;
        this.y = new_y;
    }

    right(degrees) {
        degrees = parseInt(degrees);
        this.angle = (this.angle + degrees) % 360;
    }

    left(degrees) {
        degrees = parseInt(degrees);
        this.angle = (this.angle - degrees + 360) % 360;
    }

    clearscreen() {
        background(0);
    }

    penup() {
        this.drawing = false;
    }

    pendown() {
        this.drawing = true;
    }

    home() {
        this.x = this.home_x;
        this.y = this.home_y;
    }

    label(label) {
        text(label, this.x, this.y);
    }

    setxy(new_x, new_y) {
        this.x = parseInt(new_x);
        this.y = parseInt(new_y);
    }
}

