var myElement = []; // 地树洞的元素集合
var num = 0; // 地鼠随机出现的索引
let time = 2000; // 初始的地鼠出现速度
let source = 0; // 用户得分
let timer = null; // 出现地鼠定时器
let delay = 0; // 判断用户反映速度
let count = 0; // 用户点击次数
let gameTimer = null; // 游戏时间定时器
// 初始化地鼠
$(function ($) {
  // 插入地鼠洞
  let i = 0;
  while (i < 20) {
    let div = $("<div></div>");
    $("#outBox").append(div);
    i++;
  }
  myElement = $("#outBox>div").toArray();
  $(".startGames").mouseenter(function () {
    $(this).addClass("animate__rubberBand");
  });
  setTheOne();
  setTitle();
});
// 地鼠动起来
function setTheOne() {
  myInterval();
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(myInterval, time);
}
// 定时器
function myInterval() {
  $(`#outBox>div:eq(${num})`).empty();
  num = randomNum(0, myElement.length - 1);
  let img = document.createElement("img");
  img.id = "theOne";
  img.src = "./image/theOne.png";
  $(img).bind("dragstart", () => false);
  delay = new Date().getTime();
  $(`#outBox>div:eq(${num})`).append(img);
}
// 生成随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
// 设置网页标题
function setTitle() {
  const TITLE = document.title;
  if (document.hidden !== undefined) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        return (document.title = "看啥呢，快来打我!");
      }
      document.title = TITLE;
    });
  }
}
// 开始游戏
$(".startGames").click(function () {
  if (!gameTimer) {
    setTimer();
    $(".startGames").text("结束游戏");
    // 修改鼠标指针
    $("#outBox").mouseenter(function () {
      this.style.cursor = "url(./image/favicon.ico),auto";
    });
  } else {
    clearInterval(gameTimer);
    gameTimer = null;
    $("#outBox>div").unbind("click");
    $(".startGames").text("开始游戏");
    // 修改鼠标指针
    $("#outBox").mouseenter(function () {
      this.style.cursor = "auto";
    });
    return;
  }
  // 点击地鼠洞
  $("#outBox>div").bind("click", function (e) {
    count++;
    if ($(this).find("img").length > 0) {
      // 清除之前body里面添加的i标签
      $("i").remove(".tips");
      // 判断用户速度，浮现提示词
      let extra = new Date().getTime() - delay;
      let span = document.createElement("i");
      span.className = "tips";
      if (extra < 500) {
        span.innerText = "眼疾手快 +100";
        $(span).css({
          color: "#c12c1f",
        });
        source += 100;
      } else if (extra < 1200) {
        span.innerText = "应付自如 +80";
        $(span).css({
          color: "#a76283",
        });
        source += 80;
      } else if (extra <= 2000) {
        span.innerText = "呆头呆脑 +50";
        $(span).css({
          color: "#dd7694",
        });
        source += 50;
      }
      $("body").append(span);
      let width = $(span).width();
      let height = $(span).height();
      let init = e.pageY - height / 2;
      $(span).css({
        left: e.pageX - width / 2 + "px",
        top: init + "px",
      });
      $(span).animate(
        {
          fontsize: 10 + "px",
          top: init - 150 + "px",
          opacity: 0.2,
        },
        1000,
        function () {
          $(span).css("display", "none");
        }
      );
      // 根据分数提高难度
      if (source > 1000) {
        time = 1000;
      } else if (source > 2000) {
        time = 500;
      } else if (source > 3000) {
        time = 100;
      } else if (source > 4000) {
        time = 1;
      }
      setTheOne();
    } else {
      source -= 100;
    }
    $(".userSou>span").text(source);
    $(".userCount>span").text(count);
  });
});

// 计时器
let hour = 0; //小时
let minute = 0; //分钟
let second = 0; //秒
let millisecond = 0; //毫秒

//设置时间格式
function mytime() {
  millisecond++;
  if (millisecond >= 100) {
    millisecond = 0;
    second++;
  }
  if (second >= 60) {
    second = 0;
    minute++;
  }
  if (minute >= 60) {
    minute = 0;
    hour++;
  }
  if (hour >= 24) {
    hour = 0;
  }
  $(".gameTime span").text(
    (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second) +
      ":" +
      (millisecond < 10 ? "0" + millisecond : millisecond)
  );
}
function setTimer() {
  gameTimer = setInterval(function () {
    mytime();
  }, 10);
}