const DEBUG = false;
var mx; //magnitude of x
var my; //magnitude of y
var dx;
var dy;
var interval;
var counter;


// A function that displays the counter
const displayCounter = function() {
    var counterLabel = document.getElementById("counter");
    counterLabel.innerText = "Counter: " + counter;
};

//A function that initializes the global variables
const init = function() {
    mx = Math.random()*2 + 0.25; //magnitude of x
    my = Math.random()*2 + 0.25; //magnitude of y
    dx = mx;
    dy = my;
    counter = 0;
    displayCounter();
};

// A function that checks to see if the player has lost
const isLoss = function() {
    var ball = document.getElementById("ball");
    var paddle = document.getElementById("paddle");

    var r = parseFloat(ball.getAttributeNS(null, "r"));
    var ballX = parseFloat(ball.getAttributeNS(null, "cx"));
    var ballY = parseFloat(ball.getAttributeNS(null, "cy"));
    var paddleWidth = parseFloat(paddle.getAttributeNS(null, "width"));
    var paddleX = parseFloat(paddle.getAttributeNS(null, "x"));
    var paddleY = parseFloat(paddle.getAttributeNS(null, "y"));

    //Check if the circle is within the paddle range wither by the left, right, or center
    var leftSideIn = ballX + r >= paddleX && ballX + r <= paddleX + paddleWidth;
    var rightSideIn = ballX - r >= paddleX && ballX - r <= paddleX + paddleWidth;
    var centerIn = ballX >= paddleX && ballX <= paddleX + paddleWidth;

    if (paddleY <= ballY && !(leftSideIn || centerIn || rightSideIn)) {
        return true;
    } else {
        return false;
    }
};

// A function that controls the ball movement throughout the game
const ballMove = function() {
    var ball = document.getElementById("ball");
    var startButton = document.getElementById("start");
    var r = parseFloat(ball.getAttributeNS(null, "r"));
    var cy = parseFloat(ball.getAttributeNS(null, "cy"));
    var cx = parseFloat(ball.getAttributeNS(null, "cx"));
    //Check if ball is at the bounds of the screen
    if (cy + r >= 100) {
        dy = -my;
    }
    if (cy - r <= 0) {
        dy = my;
    }
    if (cx + r >= 100) {
        dx = -mx;
    }
    if (cx - r <= 0) {
        dx = mx;
    }
    if(isLoss()){
        clearInterval(interval);
        startButton.style.display = "block";
        startButton.innerText = "Try Again?";
        dx = 0;
        dy = 0;
        console.log("You Lost.");
        ball.setAttributeNS(null, "display", "none");

    }
    cx += dx;
    cy += dy;

    ball.setAttributeNS(null, "cx", cx + "%");
    ball.setAttributeNS(null, "cy", cy + "%");
    if (DEBUG) {
        console.log(dx);
        console.log(dy);
        console.log(r);
        console.log(cx);
        console.log(cy);
        console.log(ball);
    }
};

// A function that changes the ball color if a certain point is reached
const changeColor = function() {
    var ball = document.getElementById("ball");
    if(counter/10 === 1) {
        ball.setAttributeNS(null, "fill", "#800002");
    } else if (counter/20 === 1) {
        ball.setAttributeNS(null, "fill", "#80561a");
    } else if (counter/30 === 1) {
        ball.setAttributeNS(null, "fill", "#6b8019");
    } else if (counter/40 === 1) {
        ball.setAttributeNS(null, "fill", "#10806c");
    } else if (counter/50 === 1) {
        ball.setAttributeNS(null, "fill", "#0e6d80");
    } else if (counter/60 === 1) {
        ball.setAttributeNS(null, "fill", "#0e3080");
    } else if (counter/70 === 1) {
        ball.setAttributeNS(null, "fill", "#26225d");
    } else if (counter/80 === 1) {
        ball.setAttributeNS(null, "fill", "#634310");
    } else if (counter/90 === 1) {
        ball.setAttributeNS(null, "fill", "#afaaaa");
    } else if (counter/100 === 1) {
        ball.setAttributeNS(null, "fill", "#806d0f");
    }
};

// A function that checks the position of the ball in comparison to the paddle
//  and redirects it as necessary
const checkPosition = function() {
    var ball = document.getElementById("ball");
    var paddle = document.getElementById("paddle");
    var r = parseFloat(ball.getAttributeNS(null, "r"));
    var ballX = parseFloat(ball.getAttributeNS(null, "cx"));
    var ballY = parseFloat(ball.getAttributeNS(null, "cy"));
    var paddleWidth = parseFloat(paddle.getAttributeNS(null, "width"));
    var paddleX = parseFloat(paddle.getAttributeNS(null, "x"));
    var paddleY = parseFloat(paddle.getAttributeNS(null, "y"));

    //Check if the circle is within the paddle range wither by the left, right, or center
    var leftSideIn = ballX + r >= paddleX && ballX + r <= paddleX + paddleWidth;
    var rightSideIn = ballX - r >= paddleX && ballX - r <= paddleX + paddleWidth;
    var centerIn = ballX >= paddleX && ballX <= paddleX + paddleWidth;

    if(paddleY <= ballY + r && (leftSideIn || centerIn || rightSideIn)) {
        counter += 1;
        changeColor();
        displayCounter();
        //console.log(counter);
        dy = -my;
        ballY += dy;
        ball.setAttributeNS(null, "cy", ballY + "%");
    }

};

// A function that moves the paddle right in conjunction with JQuery in paddleball.html
const movePaddleRight = function() {
    var paddle = document.getElementById("paddle");
    var paddleWidth = parseFloat(paddle.getAttributeNS(null, "width"));
    var paddleX = parseFloat(paddle.getAttributeNS(null, "x"));
    if(paddleX+paddleWidth < 100) {
        paddle.setAttributeNS(null, "x", paddleX + 5 + "%");
    }
};

// A function that moves the paddle left in conjunction with JQuery in paddleball.html
const movePaddleLeft = function() {
    var paddle = document.getElementById("paddle");
    var paddleX = parseFloat(paddle.getAttributeNS(null, "x"));
    if(paddleX > 0) {
        paddle.setAttributeNS(null, "x", paddleX - 5 + "%");
    }
};

// A function that begins the game in conjunction with with JQuery in paddleball.html
const startGame = function() {
    init();
    var ball = document.getElementById("ball");
    ball.setAttributeNS(null, "cx", 50 + "%");
    ball.setAttributeNS(null, "cy", 50 + "%");
    ball.setAttributeNS(null, "display", "block");
    console.log("click");
    interval = setInterval("ballMove()", 50);
};

// On Load the ball will move until the player has lost
window.onload = function () {
    window.setInterval("checkPosition()", 50);
    console.log("paddleball.html: javascript loaded");
};