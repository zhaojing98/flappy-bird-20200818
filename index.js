// 用对象收编变量

var bird = {
    skyPosition: 0,
    skyStep: 2,
    birdTop: 235,
    startColor: 'blue',
    startFlag: false,
    birdStepY: 0,
    minTop: 0,
    maxTop: 570,
    pipeLength: 7,
    pipeArr: [],
    // birdX: 0,
    init: function () {
        this.initData();
        this.animate();

        this.handleStart();
        this.handleClick();
    },
    initData: function () {
        this.el = document.getElementById('game');
        this.oBird = this.el.getElementsByClassName('bird')[0];
        this.oStart = this.el.getElementsByClassName('start')[0];
        this.oScore = this.el.getElementsByClassName('score')[0];
    },
    animate: function () {
        var count = 0;
        var self = this;


        this.timer = setInterval(function () {
            self.skyMove();
            // count++;
            if (self.startFlag) {
                self.birdDrop();
                self.pipeMove();
            }
            if (++count % 10 == 0) {
                if (!self.startFlag) {
                    self.startBound();
                    self.birdJump();
                    // self.pipeMove();
                }
                self.birdFly(count);
            }
        }, 30)
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
    birdDrop: function () {//小鸟落下
        this.birdTop += ++this.birdStepY;
        this.oBird.style.top = this.birdTop + 'px';
        this.judgeKnock();//碰撞检测

    },
    judgeKnock: function () {//碰撞检测
        this.judgeBoundary();
        this.judgePipe();

    },
    judgeBoundary: function () {//检测是否碰到边界
        if (this.birdTop <= this.minTop || this.birdTop >= this.maxTop) {
            this.failGame();
        }
    },
    judgePipe: function () {//检测是否碰到柱子

    },
    creatPipe: function (x) {
        //上下柱子之间距离相等 150px
        //
        // var upHeight = 50 + Math.floor(Math.random() * 175);
        // var downHeight = 450 - upHeight;
        // var oDiv = document.createElement('div');
        // oDiv.classList.add('pipe');
        // oDiv.classList.add('pipe-up');
        // oDiv.style.height = upHeight + 'px';
        // oDiv.style.left = x + 'px';
        // this.el.appendChild(oDiv);


        // var oDiv1 = document.createElement('div');
        // oDiv1.classList.add('pipe');
        // oDiv1.classList.add('pipe-down');
        // oDiv.style.height = downHeight + 'px';
        // oDiv1.style.left = x + 'px';
        // this.el.appendChild(oDiv1);
        var upHeight = 50 + Math.floor(Math.random() * 175);
        var downHeight = 450 - upHeight;
        var oUpPipe = createEle('div', ['pipe', 'pipe-up'], {
            left: x + 'px',
            height: upHeight + 'px'
        });
        var oDownPipe = createEle('div', ['pipe', 'pipe-down'], {
            left: x + 'px',
            height: downHeight + 'px'
        })
        this.el.appendChild(oUpPipe);
        this.el.appendChild(oDownPipe);
        this.pipeArr.push({
            up: oUpPipe,
            down: oDownPipe,
        })
    },
    pipeMove: function () {
        for (var i = 0; i < this.pipeLength; i++) {
            var oUpPipe = this.pipeArr[i].up;
            var oDownPipe = this.pipeArr[i].down;
            var x = oUpPipe.offsetLeft - this.skyStep;

            oUpPipe.style.left = x + 'px';
            oDownPipe.style.left = x + 'px';
        }
    },

    startBound: function () {//开始游戏颜色改变
        var prevColor = this.startColor;
        this.startColor = this.startColor === 'blue' ? 'white' : 'blue';

        this.oStart.classList.remove('start-' + prevColor);
        this.oStart.classList.add('start-' + this.startColor);
    },
    handleStart: function () {
        var self = this;

        this.oStart.onclick = function () {
            // this==this.oStart
            self.startFlag = true;
            self.oStart.style.display = 'none';
            self.oScore.style.display = 'block';
            self.oBird.style.left = '80px';
            self.skyStep = 5;
            self.oBird.style.transition = 'none';
            for (var i = 0; i < self.pipeLength; i++) {
                self.creatPipe(300 * (i + 1));
            }
        }
    },
    handleClick: function () {
        var self = this;

        this.el.onclick = function (e) {
            //冒泡了
            var dom = e.target;
            var isStart = dom.classList.contains('start');
            if (!isStart) {
                self.birdStepY = -10;
            }

            //此时过度影响了小鸟上什的速度
        }
    },
    failGame: function () {
        console.log('end');
        clearInterval(this.timer);

    },

};
bird.init();