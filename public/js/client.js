const socket = io();
$messageForm = document.querySelector('#message-form');
$messageFormInput = document.querySelector('#message-input');
$messageSubmitButton = document.querySelector('#message-send');
$sendLocationButton = document.querySelector('#send-location');
$messageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    // const message = document.querySelector('#user-input').value;
    $messageSubmitButton.setAttribute('disabled','disabled');
    const message = event.target.elements.userInput.value;
    socket.emit('message',message,(error)=>{
        $messageSubmitButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error){
           return console.log(error);
        }
        console.log('Message delivered');
    });
})

socket.on('message',(message)=>{
    console.log(message);
})

$sendLocationButton.addEventListener('click',()=>{
    $sendLocationButton.setAttribute('disabled','disabled');
  if(!navigator.geolocation){
      return alert("Your browser doesn't support location sharing!!!");
  }
  navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude} = position.coords;
      socket.emit('sendLocation',{latitude,longitude},()=>{
          $sendLocationButton.removeAttribute('disabled');
          console.log("Location shared!!!");
      });
  })
})