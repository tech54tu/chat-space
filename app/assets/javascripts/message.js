$(document).on('turbolinks:load', function(){
  $(function () {
    function buildHTML(message){
      var img = message.image ? `<img class="lower-message__image" src="${message.image}" alt="">` : "";
      var html =  `<div class="message" data-message-id = ${message.id} data-group-id = ${message.group_id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                    <div class="lower-message">
                      ${img}
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
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
        $('.messages').append(html)
        $('#new_message')[0].reset()
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('.form__submit').prop('disabled', false);
      })
      .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled', false);
      })
    })

    var reloadMessages = function() {
      var last_message_id = $('.message:last').data('message-id');
      var group_id        = $('.messages').data('group-id');
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('error');
      });
    };
    setInterval(reloadMessages, 5000);
  })
});