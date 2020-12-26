function renderUsers(users) {
  let html = '';

  for (let i = 0; i < users.length; i++) {
    html += '<li animated fadeIn>';
    html +=   `<a data-id=${users[i].id} href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>`;
    html += '</li>';
  }

  userList.html(html);
}

function renderMessage(data, me) {
  const {
    admin,
    date,
    from,
    message,
  } = data;
  let html = '';
  let dateInstance = new Date(date);
  let time = `${dateInstance.getHours()} : ${dateInstance.getMinutes()}`;

  if(me) {
    html += '<li class="reverse">';
    html += '  <div class="chat-content">';
    html += `    <h5>${from}</h5>`;
    html += `    <div class="box bg-light-inverse">${message}</div>`;
    html += '  </div>';
    html += '  <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += `  <div class="chat-time">${time}</div>`;
    html += '</li>';
  } else {
    html += '<li class="animated fadeIn">';
    if(!admin) {
      html += '  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '  <div class="chat-content">';
    html += `    <h5>${from}</h5>`;
    html += `    <div class="box bg-light-${admin ? 'danger' : 'info'}">${message}</div>`;
    html += '  </div>';
    html += `  <div class="chat-time">${time}</div>`;
    html += '</li>';
  }

  chatBox.append(html);
}

function scrollBottom() {
  // selectors
  var newMessage = chatBox.children('li:last-child');

  // heights
  var clientHeight = chatBox.prop('clientHeight');
  var scrollTop = chatBox.prop('scrollTop');
  var scrollHeight = chatBox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      chatBox.scrollTop(scrollHeight);
  }
}

let userList = $('#divUsuarios');
let userInput = $('#inputMessage');
let messageForm = $('#messageForm');
let chatBox = $('#divChatbox');

// Listeners
userList.on('click', 'a', function() {
  let id = $(this).data('id');

  if(id) {
    console.log(id);
  }
});

messageForm.on('submit', function(e) {
  e.preventDefault();
  let message = userInput.val().trim();

  if(message.length) {
    socket.emit('message', message, function(resp) {
      userInput.val('');

      if(resp) {
        renderMessage(resp, true);
        scrollBottom();
      }
    });
  }
});
