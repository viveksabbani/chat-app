const socket = io();

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    // const message = document.querySelector('#user-input').value;
    const message = event.target.elements.userInput.value;
    socket.emit('message',message);
})

socket.on('message',(message)=>{
    console.log(message);
})

document.querySelector('#send-location').addEventListener('click',()=>{
  if(!navigator.geolocation){
      return alert("Your browser doesn't support location sharing!!!");
  }
  navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude} = position.coords;
      socket.emit('sendLocation',{latitude,longitude});
  })
})