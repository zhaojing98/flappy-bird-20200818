// 用对象收编变量

var bird = {
    skyPosition: 0,
    skyStep: 2,
    birdTop: 235,
    startColor: 'blue',
    // birdX: 0,
    init: function () {
        this.initData();
        this.animate();
    },
    initData: function () {
        this.el = document.getElementById('game');
        this.oBird = this.el.getElementsByClassName('bird')[0];
        this.oStart = this.el.getElementsByClassName('start')[0];
    },
    animate: function () {
        var count = 0;
        var self = this;
        console.log('cmdsinbk ');
        setInterval(function () {
            self.skyMove();
            // count++;
            if (++count % 10 == 0) {
                self.birdJump();
                self.startBound();
                self.birdFly(count);
            }
        }, 30)
        this.skyMove();
    },
    skyMove: function () {
        // var self = this;
        // setInterval(function () {
        this.skyPosition -= this.skyStep;
        this.el.style.backgroundPositionX = this.skyPosition + 'px';
        // }, 30)
    },
    birdJump: function () {
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    },
    birdFly: function (count) {
        // this.birdX -= 30;
        this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
    },
    startBound: function () {
        var prevColor = this.startColor;
        this.startColor = this.startColor === 'blue' ? 'white' : 'blue';

        this.oStart.classList.remove('start-' + prevColor);
        this.oStart.classList.add('start-' + this.startColor);
    },

};
bird.init();