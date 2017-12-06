if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'clock'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'clock'.");
}
var clock = function (_, Kotlin) {
  'use strict';
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var audio;
  var canvas;
  var context;
  var width;
  var height;
  var hour;
  var minute;
  var second;
  var radius;
  var point;
  var pointAngle;
  var timeArray;
  var textAngle;
  function main$lambda() {
    drawClock();
    playAudio();
  }
  function main(args) {
    getSize();
    drawClock();
    window.setInterval(main$lambda, 1000);
  }
  function getSize() {
    context.canvas.width = width;
    context.canvas.height = height;
  }
  function drawClock() {
    context.clearRect(0.0, 0.0, width, height);
    getNowTime();
    drawOutCircle();
    drawInsidePoint();
    drawTimeText();
    drawHourLine(hour, minute);
    drawMinuteLine(minute);
    drawSecondLine(second);
    drawCenter();
    context.restore();
  }
  function getNowTime() {
    var date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
  }
  function drawOutCircle() {
    context.save();
    context.beginPath();
    context.lineWidth = 5.0;
    context.strokeStyle = '#fff';
    context.translate(width / 2, height / 2);
    context.arc(0.0, 0.0, radius, 0.0, 2 * Math.PI);
    context.stroke();
  }
  function drawInsidePoint() {
    var tmp$;
    tmp$ = point.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      context.beginPath();
      if (element % 5 === 0) {
        context.fillStyle = '#CE0000';
      }
       else {
        context.fillStyle = '#FFECEC';
      }
      var x = Math.cos(element * pointAngle) * (radius - 10);
      var y = Math.sin(element * pointAngle) * (radius - 10);
      context.arc(x, y, 2.0, 0.0, 2 * Math.PI);
      context.fill();
    }
  }
  function drawTimeText() {
    var $receiver = timeArray;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      var index_0 = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
      context.beginPath();
      context.font = '20px Arial';
      context.fillStyle = '#fff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      var x = Math.cos(index_0 * textAngle) * (radius - 25);
      var y = Math.sin(index_0 * textAngle) * (radius - 25);
      context.fillText(timeArray[index_0], x, y);
    }
  }
  function drawHourLine(hour, minute) {
    context.save();
    context.beginPath();
    context.lineWidth = 7.0;
    context.strokeStyle = '#F75000';
    context.lineCap = 'round';
    var hourAngle = hour * textAngle;
    var minuteAngle = minute / 60 * textAngle;
    context.rotate(hourAngle + minuteAngle);
    context.moveTo(0.0, 10.0);
    context.lineTo(0.0, -radius / 2);
    context.stroke();
    context.restore();
  }
  function drawMinuteLine(minute) {
    context.save();
    context.beginPath();
    context.lineWidth = 5.0;
    context.strokeStyle = '#F75000';
    context.lineCap = 'round';
    context.rotate(minute * pointAngle);
    context.moveTo(0.0, 12.0);
    context.lineTo(0.0, -radius / 2 - 10);
    context.stroke();
    context.restore();
  }
  function drawSecondLine(second) {
    context.save();
    context.beginPath();
    context.fillStyle = '#00DB00';
    context.rotate(second * pointAngle);
    context.moveTo(-2.0, 20.0);
    context.lineTo(2.0, 20.0);
    context.lineTo(1.0, -radius + 18);
    context.lineTo(-1.0, -radius + 18);
    context.fill();
    context.restore();
  }
  function drawCenter() {
    context.beginPath();
    context.fillStyle = '#ccc';
    context.arc(0.0, 0.0, 7.0, 0.0, 2 * Math.PI);
    context.fill();
  }
  function playAudio() {
    audio.play();
  }
  Object.defineProperty(_, 'audio', {
    get: function () {
      return audio;
    }
  });
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  Object.defineProperty(_, 'context', {
    get: function () {
      return context;
    }
  });
  Object.defineProperty(_, 'width', {
    get: function () {
      return width;
    }
  });
  Object.defineProperty(_, 'height', {
    get: function () {
      return height;
    }
  });
  Object.defineProperty(_, 'hour', {
    get: function () {
      return hour;
    },
    set: function (value) {
      hour = value;
    }
  });
  Object.defineProperty(_, 'minute', {
    get: function () {
      return minute;
    },
    set: function (value) {
      minute = value;
    }
  });
  Object.defineProperty(_, 'second', {
    get: function () {
      return second;
    },
    set: function (value) {
      second = value;
    }
  });
  Object.defineProperty(_, 'radius', {
    get: function () {
      return radius;
    }
  });
  Object.defineProperty(_, 'point', {
    get: function () {
      return point;
    }
  });
  Object.defineProperty(_, 'pointAngle', {
    get: function () {
      return pointAngle;
    }
  });
  Object.defineProperty(_, 'timeArray', {
    get: function () {
      return timeArray;
    }
  });
  Object.defineProperty(_, 'textAngle', {
    get: function () {
      return textAngle;
    }
  });
  _.main_kand9s$ = main;
  _.getSize = getSize;
  _.drawClock = drawClock;
  _.getNowTime = getNowTime;
  _.drawOutCircle = drawOutCircle;
  _.drawInsidePoint = drawInsidePoint;
  _.drawTimeText = drawTimeText;
  _.drawHourLine_vux9f0$ = drawHourLine;
  _.drawMinuteLine_za3lpa$ = drawMinuteLine;
  _.drawSecondLine_za3lpa$ = drawSecondLine;
  _.drawCenter = drawCenter;
  _.playAudio = playAudio;
  var tmp$, tmp$_0, tmp$_1;
  audio = Kotlin.isType(tmp$ = document.getElementById('audio'), HTMLAudioElement) ? tmp$ : Kotlin.throwCCE();
  canvas = Kotlin.isType(tmp$_0 = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$_0 : Kotlin.throwCCE();
  context = Kotlin.isType(tmp$_1 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_1 : Kotlin.throwCCE();
  width = window.innerWidth;
  height = window.innerHeight;
  hour = 0;
  minute = 0;
  second = 0;
  radius = 100.0;
  point = new IntRange(0, 59);
  pointAngle = 2 * Math.PI / 60;
  timeArray = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'];
  textAngle = 2 * Math.PI / 12;
  main([]);
  Kotlin.defineModule('clock', _);
  return _;
}(typeof clock === 'undefined' ? {} : clock, kotlin);
