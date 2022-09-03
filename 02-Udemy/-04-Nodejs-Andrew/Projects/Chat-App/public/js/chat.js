const socket = io();
//elements
const messageForm = document.querySelector("#message-form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const sendLocationButton = document.querySelector("#location");
const messages = document.querySelector("#messages");

// templates

const messageTemplate = document.querySelector("#message-template").innerHTML;
const LocationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar__template").innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// auto scrolling

const autoScroll = () => {
  const newMessage = messages.lastElementChild;

  //// height of the new message
  const newMessageStyle = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  // visible height
  const visibleHeight = messages.offsetHeight;

  //container height

  const containerHeight = messages.scrollHeight;

  /// how far i've scrolled
  const scrollOffset = (messages.scrollTop + visibleHeight) * 2;

  if (containerHeight - newMessageHeight < scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

///// get location message
socket.on("locationMessage", (text) => {
  const html = Mustache.render(LocationMessageTemplate, {
    username: text.username,
    url: text.url,
    createdAt: moment(text.createdAt).format("h:mm a"),
  });

  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

///// side bar

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, { room, users });
  document.querySelector("#sidebar").innerHTML = html;
});

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });

  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageFormButton.setAttribute("disabled", "disabled");

  const message = messageFormInput.value;

  socket.emit("sendMessage", message, (error) => {
    messageFormButton.removeAttribute("disabled");
    messageFormInput.value = "";
    messageFormInput.focus();
    if (error) {
      console.log(error);
    }
  });
});

sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocatione is not supported");
  }

  sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        sendLocationButton.removeAttribute("disabled", "disabled");
      }
    );
  });
});

/////// join a room
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
