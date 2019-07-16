$(function(){
  function buildHTML(message){
    var content = message.text ? `${message.text}` : "";
    var img = message.image ? `<img src= ${message.image}` : "";
    var html = `<li class="contents__main__ul__li">
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
              </li>
`;
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
      $('.contents__form__multi__main__input').val('');
      $('.contents__form__multi__submit').prop('disabled',false);
      scroll();
    })
    .fail(function(){
      arert('error');
    })
  })
})