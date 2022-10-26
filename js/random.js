function RNG(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 22345;
    this.s=0;

    this.state = seed;
    this.nextFloat = function () {
        this.state = ((this.a * this.state + this.c) % this.m);
        if(this.s>11154){
            this.state=Math.random();
            this.s=0;
        }
        this.s++;
        return this.state / (this.m - 1);
    }
}