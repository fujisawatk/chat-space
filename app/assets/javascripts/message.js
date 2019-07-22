$(function(){
  function buildHTML(message){
    var content = message.text ? `${message.text}` : "";
    var img = message.image ? `<img src= ${message.image}` : "";
    var html = `<li class="contents__main__ul__li", data-message_id="${message.id}">
                  <div class="contents__main__ul__li--up">
                    <div class="contents__main__ul__li--up--name">
                      ${message.user_name}
                    </div>
                    <div class="contents__main__ul__li--up--date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="contents__main__ul__li--down">
                      <div class="contents__main__ul__li--down--messages">
                        ${content}
                      </div>
                      <div class="contents__main__ul__li--messages--image">
                        ${img}
                      </div>
                  </div>
                </li>`;

    scroll()
    return html;
  }

  function scroll(){
    $('.contents__main').animate({scrollTop: $('.contents__main')[0].scrollHeight});
  }


    $('.contents__form__multi').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
        })
        .done(function(data){
          var html = buildHTML(data);
          $('.contents__main__ul').append(html);
          $('.contents__form__multi')[0].reset();
          $('.contents__form__multi__submit').prop('disabled',false);
          scroll();
        })
        .fail(function(){
          alert('メッセージを入力して下さい');
        })
    
});
  
  var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        if($('.contents__main__ul__li')[0]){
          var last_message_id = $('.contents__main__ul__li:last').data('message_id');
        }else{
          var last_message_id = 0
        }
      $.ajax({
        url: "api/messages",
        type: 'GET',
        data: {
          message: { id: last_message_id }
        },
        dataType: 'json'
      })
      
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){ 
        insertHTML = buildHTML(message);
        $('.contents__main__ul').append(insertHTML);
        })
      })
      .fail(function(){
        alert('更新に失敗しました');
      })
    }
    else{
    clearInterval(reloadMessages);
    }
  }
  setInterval(reloadMessages, 5000);
});