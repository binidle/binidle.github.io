function RNG(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed;
    this.nextFloat = function () {
        s = ((this.a * this.state + this.c) % this.m);
        this.state = s;
        return s / (this.m - 1);
    }
}