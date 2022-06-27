const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "white";

let size = Math.ceil(canvas.width / 2.5);

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
}

const kochCurve = (p0, p1) => {
    let distance = Math.sqrt(
        Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2)
    );

    let div = Math.floor(distance / 3);
    let angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

    let pA = new Point(p0.x + (p1.x - p0.x) / 3, p0.y + (p1.y - p0.y) / 3);

    let pB = new Point(
        pA.x + div * Math.cos(angle - Math.PI / 3),
        pA.y + div * Math.sin(angle - Math.PI / 3)
    );

    let pC = new Point(p1.x - (p1.x - p0.x) / 3, p1.y - (p1.y - p0.y) / 3);

    ctx.strokeStyle = "#e63946";

    if (distance > 1) {
        kochCurve(p0, pA);
        kochCurve(pA, pB);
        kochCurve(pB, pC);
        kochCurve(pC, p1);
    } else {
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);

        ctx.lineTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pC.x, pC.y);

        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.closePath();
    }
};

const p0 = new Point(canvas.width / 2 + size / 2, canvas.height / 2 + size / 2);
const p1 = new Point(p0.x - size, p0.y);
const p2 = new Point(
    p0.x - size / 2,
    p0.y - Math.sqrt(Math.pow(size, 2) - Math.pow(size / 2, 2))
);

kochCurve(p0, p1);
kochCurve(p1, p2);
kochCurve(p2, p0);
