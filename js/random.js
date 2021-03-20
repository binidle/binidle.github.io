function RNG(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed;
}
RNG.prototype.nextFloat = function () {
    this.state,s = ((this.a * this.state + this.c) % this.m);
    return s / (this.m - 1);
}