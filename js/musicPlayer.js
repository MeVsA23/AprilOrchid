$(function () {

  var musicLst = [
    {
      "title": "春蝉",
      "artist": "ゴンチチ",
      "album": "Humble Music",
      "path": "./music/spring.mp3"
    },
    {
      "title": "フロウ",
      "artist": "ゴンチチ",
      "album": "DUO",
      "path": "./music/lokolo.mp3"
    },
	{
      "title": "子供の時間",
      "artist": "ゴンチチ",
      "album": "DUO",
      "path": "./music/childtimes.mp3"
    },
	{
      "title": "放课后の音楽室",
      "artist": "ゴンチチ",
      "album": "DUO",
      "path": "./music/afterClass.mp3"
    },
	{
      "title": "A Song For Love",
      "artist": "春畑道哉",
      "album": "DUO",
      "path": "./music/songlove.mp3"
    },
    {
      "title": "Write Me A Letter",
      "artist": "Endless Melancholy",
      "album": "Fragile",
      "path": "./music/aLetter.mp3"
    },
    {
      "title": "We Have Met Before",
      "artist": "Endless Melancholy",
      "album": "Fragile",
      "path": "./music/metbefore.mp3"
    },
    {
      "title": "Dispear in Light",
      "artist": "Endless Melancholy",
      "album": "Fragile",
      "path": "./music/dispear.mp3"
    },
  ]

  var sentences = [
    '诸事不顺, 就稍稍休息一下吧',
    '我笑起来真好看, 像春天的皮皮虾',
    '平凡、普通、幸福、快乐，并不相互冲突',
    '无词的音乐, 是心灵的感应',
    '那个进度条, 是不允许拖动的',
    '静下心来, 寻找自己真正想要的',
    '谢谢你可以来到这里, 希望你度过美好的一天',
    '没有句号的句子, 就不代表结束',
    '其实你也可以留个言, 展示在这里',
    '为什么音乐图片不会换, 因为我知道你只看这里',
    '有多久没有仰望星空了呢',
    '小船, 小船, 漂啊漂~~',
    '你可以边滑动, 边看这里'
  ]

  // 随机音乐组
  function shuffle(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      var index = parseInt(Math.random() * (len - i));
      var temp = arr[index];
      arr[index] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
  }
  var artist = $('.artist');
  var title = $('.title');
  shuffle(musicLst);
  shuffle(sentences);
  $(".musCard").append('<audio id="myAudio" src="' + musicLst[0].path + '" type="audio/mpeg"></audio>');
  $("#myAudio").src = musicLst[0].path;
  artist.text(musicLst[0].artist);
  title.text(musicLst[0].title);
  // 把当前播放放到最后
  var firstMus = musicLst.shift();
  musicLst.push(firstMus);
  console.log('start', musicLst);
  // 获取audio
  var audio = document.getElementById("myAudio");
  // 播放音乐，开始
  function playMus(src) {
    src.play();
    timer = setInterval(() => {
      // 每一秒执行一次获取音乐时间
      getTrackTime();
    }, 1000);
  };

  function pauseMus(src, interval) {
    src.pause();
    clearInterval(interval);
  };
  // 定义计时器
  var timer;
  // 定义变量区域
  var playPause = $(".playPause");
  var pause = $('.pause');
  var play = $(".play");
 
  var track = $(".track");
  // 定义变量区域
  // 下一首
  $('.skip').on('click', function () {
    pauseMus(audio, timer);
    audio.src = musicLst[0].path;
    playMus(audio);
    artist.text(musicLst[0].artist);
    title.text(musicLst[0].title);
    // 把当前播放放到最后
    var firstMus = musicLst.shift();
    musicLst.push(firstMus);
    console.log(musicLst);
    $('.pause').remove();
    playPause.css("box-shadow", "0 -5px 5px rgba(255,255,255,0.05),inset 0 -5px 5px rgba(255,255,255,0.05),0 5px 5px rgba(0,0,0,0.3),inset 0 5px 5px rgba(0,0,0,0.3)");
    $('.play').remove();
    playPause.append('<i class="pause fa fa-pause"></i>');
  });
  // 上一首
  $('.back').on('click', function () {
    pauseMus(audio, timer);
    audio.src = musicLst[musicLst.length - 2].path;
    playMus(audio);
    artist.text(musicLst[musicLst.length - 2].artist);
    title.text(musicLst[musicLst.length - 2].title);
    // 把上一首放到最前，删除最后的上一首
    musicLst.unshift(musicLst[musicLst.length - 1]);
    musicLst.pop(musicLst);
    console.log(musicLst)
  });

  playPause.on('click', function () {
    // 正在播放
    if (audio.paused || audio.ended) {
      playMus(audio);
      playPause.css("box-shadow", "0 -5px 5px rgba(255,255,255,0.05),inset 0 -5px 5px rgba(255,255,255,0.05),0 5px 5px rgba(0,0,0,0.3),inset 0 5px 5px rgba(0,0,0,0.3)");
      $('.play').remove();
      playPause.append('<i class="pause fa fa-pause"></i>');
    } else {
      // 暂停时
      pauseMus(audio, timer);
      console.log("paused");
      playPause.css("box-shadow", "0 -5px 5px rgba(255,255,255,0.05),0 5px 5px rgba(0,0,0,0.3)");
      $('.pause').remove();
      playPause.append('<i class="play fa fa-play"></i>');
    }
  });

  function getTrackTime() {
    // 总进度
    let totalminutes = parseInt(audio.duration / 60, 10);
    let totalseconds = parseInt(audio.duration % 60);
    let totalTime;
    if (0 <= totalminutes < 10 & totalseconds < 10) {
      totalTime = "0" + totalminutes + ":0" + totalseconds;
    } else if (0 <= totalminutes < 10 & totalseconds > 10) {
      totalTime = "0" + totalminutes + ":" + totalseconds;
    } else {
      totalTime = "加载中...";
    }

    // 当前进度
    let curminutes = parseInt(audio.currentTime / 60, 10);
    let curseconds = parseInt(audio.currentTime % 60);
    var curTime;
    if (curseconds < 10) {
      curTime = "0" + curminutes + ":0" + curseconds;
    } else {
      curTime = "0" + curminutes + ":" + curseconds;
    }

    // 进度条
    var percent = audio.currentTime / audio.duration
    //进度
    track.css("width", (percent * 100) + "%");
    $('.totalTime').html(totalTime);
    $('.curTime').html(curTime);
  }
  // 获取当前进度
  audio.addEventListener('timeupdate', getTrackTime());

  // 播放结束时
  audio.addEventListener('ended', function () {
    track.css("width", "0%");
    audio.src = musicLst[0].path;
    artist.html(musicLst[0].artist);
    title.html(musicLst[0].title);
    audio.play()
    // 把当前播放放到最后
    var firstMus = musicLst.shift();
    musicLst.push(firstMus);
    console.log("end", musicLst);
    $('.pause').remove();
    playPause.css("box-shadow", "0 -5px 5px rgba(255,255,255,0.05),inset 0 -5px 5px rgba(255,255,255,0.05),0 5px 5px rgba(0,0,0,0.3),inset 0 5px 5px rgba(0,0,0,0.3)");
    $('.play').remove();
    playPause.append('<i class="pause fa fa-pause"></i>');
  })

  let myTop = $('.sky').offset().top;
  let arrow = 0;
  let playButton = $('.playButton');
  let extend = $('.extend');
  let whatIreckon = $('.whatIreckon');
  $(document).on('scroll', function () {
    // window.pageYOffset for IOS
    if (document.documentElement.scrollTop > myTop) {
      whatIreckon.css({ 'position': 'fixed', 'z-index': '10', 'top': '0', 'background-color': 'rgb(18, 19, 19)', 'margin': '0' });

      playButton.css('right', '-80px');
      extend.text('<<');
      arrow = 0;
    } else {
      whatIreckon.css({ 'position': 'static', 'z-index': '1', 'top': '0' });
      playButton.css('right', '-120px');
      extend.text('<<');
      arrow = 0;
    }
  });
// 显示播方音乐
  extend.click(function () {
    if (arrow == 0) {
      playButton.css('right', '0');
      extend.text('>>');
      arrow = 1;
    } else {
      playButton.css('right', '-80px');
      extend.text('<<');
      arrow = 0;
    }
  });

// 显示词句
  let i = 0;
  whatIreckon.text(sentences[5]);
  setInterval(function () {
    whatIreckon.text('');
    whatIreckon.html('<p class="sentence">' + sentences[i] + '</p>');
    $('.sentence').fadeIn(2000);
    i++;
    if (i >= sentences.length) {
      i = 0
    }
  }, 6000);

// 判断发送条件
  $('.textArea').on('input', function () {
    let val = $(this).val();
    let num = val.length;
    if (4 <= num && num < 150) {
      $('.submit').html('<div class="showButton">发送</div>');
    } else {
      $('.submit').html('');
    }
  });
 
  $('.submit').on('click','.showButton', function(){
    let content = $('.textArea');
    $.ajax({
             url: "./handler/textHandler.php", 
             type: "POST",
             data:{text:content.val()},
             dataType: "json",
             error: function(){  
              $(".show").append('<div class="popUP">服务器接收错误</div>');
              setTimeout(()=>{
                  $('.popUP').remove();
              },3000)
             },  
             success: function(res){//如果调用php成功 
              console.log(res.msg);
              $(".show").append('<div class="popUP">谢谢你的留言</div>');
              $('.submit').html('');
              content.val('');
              setTimeout(()=>{
                  $('.popUP').remove();
              },5000)
            }
  })
});
})

