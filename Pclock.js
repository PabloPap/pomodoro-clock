var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineCap = "round";
ctx.shadowBlur = 10;
ctx.shadowColor = "#EA4335";

var toggleBtn = document.getElementById("toggle");
var resetBtn = document.getElementById("reset");
var downbreakBtn = document.getElementById("downbreak");
var upbreakBtn = document.getElementById("upbreak");
var downtimeBtn = document.getElementById("downtime");
var uptimeBtn = document.getElementById("uptime");

function showTimer() {
    var time = 1500000;
    var startTime;
    var interval;
    var editTime = 1500000;

    function newTime() {
        if (this.clockStatus) {
            var present = Date.now();
            time -= (present - startTime);
            startTime = present;
            console.log(time);
            if(time <= 1){
                clearInterval(interval);
            }
        }
        getTime(time);
    }

    function getTime(tMillis) {
        var now = new Date(tMillis);
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        console.log(seconds);
        //add millis to every sec for smoother line
        var smoothSecs = seconds + (now.getMilliseconds() / 1000);

        var circleIdx = 360 / minutes;
        console.log(circleIdx);
        // Background
        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, Math.PI * 2);
        ctx.fillStyle = "#333333";
        ctx.strokeStyle = "#EA4335";
        ctx.lineWidth = 22;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Minutes circle
        ctx.beginPath();
        ctx.arc(250, 250, 150, converter(0), converter(minutes * circleIdx));
        ctx.strokeStyle = "#EA4335";
        ctx.lineWidth = 25;
        ctx.stroke();
        ctx.closePath();

        // Seconds circle
        ctx.beginPath();
        ctx.arc(250, 250, 100, converter(0), converter(smoothSecs * 6));
        ctx.strokeStyle = "#EA4335";
        ctx.lineWidth = 20;
        ctx.stroke();
        ctx.closePath();

        // Timer Output
        ctx.font = "35px sans-serif";
        ctx.fillStyle = "#EA4335";
        if (minutes < 10) {
            ctx.fillText("0", 200, 250);
            ctx.fillText(minutes, 220, 250);
        } else {
            ctx.fillText(minutes, 200, 250);
        }
        ctx.fillText(":", 240, 250);

        if (seconds < 10) {
            ctx.fillText("0", 250, 250);
            ctx.fillText(seconds, 270, 250);
        } else {
            ctx.fillText(seconds, 250, 250);
        }

        function converter(deg) { // 1 deg = pi/180 rad
            return (deg * Math.PI) / 180; // degrees to rads
        }
    }

    // Timer's Engine

    this.clockStatus = false;

    this.run = function () {
        if (!this.clockStatus) {
            interval = setInterval(newTime.bind(this), 100);
            startTime = Date.now();
            this.clockStatus = true;
        }
    };

    this.freeze = function () {
        if (this.clockStatus) {
            clearInterval(interval);
            //interval = null;
            this.clockStatus = false;
        }
    };

    this.reset = function () {
        if (!this.clockStatus) {
            time = 1500000;
            newTime();
        }
    };

    // user interaction

    getTime(editTime);

    this.downTime = function () {
        if (!this.clockStatus && editTime > 60000) {
            var decrease = editTime - 60000;
            getTime(decrease);
            editTime = decrease;
            time = decrease;
        }
    };

    this.upTime = function () {
        if (!this.clockStatus && editTime < 3000000) {
            var increase = editTime + 60000;
            getTime(increase);
            editTime = increase;
            time = increase;
        }
    };

    this.downBreak = function () {
        if (!this.clockStatus && editTime > 60000) {
            var decrease = editTime - 60000;
            getTime(decrease);
            editTime = decrease;
            time = decrease;
        }
    };

    this.upBreak = function () {
        if (!this.clockStatus && editTime < 600000) {
            var increase = editTime + 60000;
            getTime(increase);
            editTime = increase;
            time = increase;
        }
    };

}

var clock = new showTimer();

function start() {
    clock.run();
    toggleBtn.textContent = "stop";
}

function stop() {
    clock.freeze();
    toggleBtn.textContent = "start";
}

toggleBtn.addEventListener("click", function () {
    (clock.clockStatus) ? stop(): start();
});

resetBtn.addEventListener("click", function () {
    clock.reset();
});

downbreakBtn.addEventListener("click", function () {
    clock.downBreak();
});

upbreakBtn.addEventListener("click", function () {
    clock.upBreak();
});

downtimeBtn.addEventListener("click", function () {
    clock.downTime();
});

uptimeBtn.addEventListener("click", function () {
    clock.upTime();
});
