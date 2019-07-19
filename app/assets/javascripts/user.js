$(function(){


  
  var search_result = $("#user-search-result");
  var add_members = $("#chat-group-form__field--right--users")

  function appendUser(user){
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix' id='chat-group-user-22'>
                    <input name='chat_group[user_ids][]' type='hidden' value='22'>
                    <p class='chat-group-user__name'>${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>
                </div>`;
        search_result.append(html);
  }
  function appendErrMsgToHTML(msg){
    var html = `<div id='chat-group-users'>
                  <p class='chat-group-user__name'>${msg}</p>
                </div>`;
        search_result.append(html);
  }

  function appendMembers(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
        add_members.append(html);
  }

  $('#user-search-field').on("keyup", function(e){
    e.preventDefault;
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません")
      };
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on("click",".user-search-add", function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    $(this).parent().remove();
      appendMembers(name, id);
  });
  $(document).on("click",".user-search-remove", function(){
    $(this).parent().remove();
  });
});