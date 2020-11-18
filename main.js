


















const screen = {
  init(id) {
    this.elem = document.getElementById(id);
    this.style = this.elem.style;
    this.resize();
    window.addEventListener("resize", () => this.resize(), false);
  },
  resize() {
    this.width = this.elem.offsetWidth;
    this.height = this.elem.offsetHeight;
  }
};

const cube = document.getElementById("cube");

const ease = (value, target, speed) => value += (target - value) * speed;

const pointer = {
  init() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.xb = 0;
    this.yb = 0;
    this.dx = 0;
    this.dy = 0;
    this.isDown = false;
    window.addEventListener('pointermove', e => this.move(e), false);
    window.addEventListener('pointerdown', e => this.down(e), false);
    window.addEventListener('pointerup', e => this.up(e), false);
  },
  down(e) {
    this.move(e);
    this.xb = this.x;
    this.yb = this.y;
    this.isDown = true;
    this.z = 250;
  },
  up(e) {
    this.isDown = false;
    this.z = 400;
  },
  move(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    if (this.isDown) {
      this.dx += (this.x - this.xb) / screen.width;
      this.dy += (this.y - this.yb) / screen.height;
    }
    this.xb = this.x;
    this.yb = this.y;
  }
};

screen.init('screen');
pointer.init();
let ex = 0, ey = 0; y = 0;
const grid = window.location.href.indexOf("fullcpgrid");
pointer.z = grid === -1 ? 400 : 250;
let ez = 100;

const run = () => {
  requestAnimationFrame(run);

  ex = ease(ex, pointer.dx, 0.1);
  ey = ease(ey, pointer.dy, 0.1);
  ez = ease(ez, pointer.z, 0.01);
  pointer.dy = ease(pointer.dy, 0.5, 0.0025);

  cube.style.setProperty("transform", `translateZ(${ez}px) rotateX(${180 * ey - 90}deg) rotateY(${-180 * ex}deg)`);
  screen.style.setProperty("perspective", `${ez}px`);
};

run();