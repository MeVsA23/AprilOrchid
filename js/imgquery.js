$(function () {
  $.ajax({
    url: "./handler/getimglist.php",
    type: "POST",
    // data:{text:'text'},
    dataType: "json",
    error: function () {
      console.log("no");
    },
    success: function (res) {
      //如果调用php成功
      // console.log(res);
      let row = [];
      let row2 = [];
      let counter = 1;
      let counter2 = 1;
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      var start = performance.now();
      // row3.push(lst[2]);
      const waterfall2 = (lst) => {
        row.push(lst[0]);
        row2.push(lst[1]);
        let j = 0;
        for (let i = 2; i < lst.length; i++) {
          if (lst[i].type != row[j].type && counter < row2.length) {
            row.push(lst[i]);
            j += 1;
            counter += 1;
          } else {
            if (counter2 >= row.length) {
              row.push(lst[i]);
              counter += 1;
            } else {
              row2.push(lst[i]);
              counter2 += 1;
            }
          }
          // debugger;
        }
      };
      if (width > 768) {
        waterfall2(res);
        $(".galleryWrap").append(
          "<div class='container1'></div><div class='container2'></div>"
        );
        for (let i = 0; i < row.length; i++) {
          $(".container1").append(
            `<div class="box"><a href='https://aprilorchid.com/handler/${row[i].url}' target="_blank"><img class='imgWidth' onload="countLoad()" data-src='https://aprilorchid.com/handler/${row[i].url}'/></a><p>「${row[i].title}」</p><div class="subInfo"><span>${row[i].date}</span><div class="likeInfo"><?xml version="1.0" encoding="UTF-8"?><svg class="love" gal-id=${row[i].id} status="0" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ce3838" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span">${row[i].likes}</span></div></div></div>`
          );
        }

        for (let i = 0; i < row2.length; i++) {
          $(".container2").append(
            `<div class="box"><a href='https://aprilorchid.com/handler/${row2[i].url}' target="_blank"><img class='imgWidth' onload="countLoad()" data-src='https://aprilorchid.com/handler/${row2[i].url}'/></a><p>「${row2[i].title}」</p><div class="subInfo"><span>${row2[i].date}</span><div class="likeInfo"><?xml version="1.0" encoding="UTF-8"?><svg class="love" gal-id=${row2[i].id} status="0" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ce3838" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span">${row2[i].likes}</span></div></div></div>`
          );
        }
      } else {
        for (let i = 0; i < res.length; i++) {
          $(".galleryWrap").append(
            `<div class="box"><a href='https://aprilorchid.com/handler/${res[i].url}' target="_blank"><img class='imgWidth' onload="countLoad()" data-src='https://aprilorchid.com/handler/${res[i].url}'/></a><p>「${res[i].title}」</p><div class="subInfo"><span>${res[i].date}</span><div class="likeInfo"><?xml version="1.0" encoding="UTF-8"?><svg class="love" gal-id=${res[i].id} status="0" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ce3838" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span">${res[i].likes}</span></div></div></div>`
          );
        }
      }
      
      var images = document.querySelectorAll(".imgWidth");
      lazyload(images);
     
    },
  });
  
});
