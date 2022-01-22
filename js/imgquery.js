
$(function(){

    $.ajax({
        url: "./handler/getimglist.php", 
        type: "POST",
        // data:{text:'text'},
        dataType: "json",
        error: function(){  
        console.log('no')
        },  
        success: function(res){//如果调用php成功 
          
          for (let i = 0; i < res.length; i++) {
            $('.galleryWrap').append( `<a href='https://aprilorchid.com/handler/${res[i].url}'><img class='imgWidth' src='https://aprilorchid.com/handler/${res[i].url}'/></a><p>${res[i].title}</p><div class="subInfo"><span>${res[i].date}</span><div class="likeInfo"><?xml version="1.0" encoding="UTF-8"?><svg class="love" gal-id=${res[i].id} status="0" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span">${res[i].likes}</span></div></div>`);

          }
          let images = document.querySelectorAll(".imgWidth");
            lazyload(images);
       }
    })
    })