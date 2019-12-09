console.log('Client side script is loaded !!')



var webform = document.querySelector('form')
var inputText = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')

webform.addEventListener('submit', (e) => {
    e.preventDefault()
    var searchText = inputText.value
    messageTwo.textContent = "Loading..."
    messageOne.textContent = ""
    fetch(`http://localhost:3000/weather?address=${searchText}`).then((response) => {
        response.json().then((data) => {
            if (data.error)
                messageTwo.textContent = data.error
            else {
                messageOne.textContent = `Location : ${data.location}`
                messageTwo.textContent = `Weather forecast: ${data.forecast}`
            }
        })
    })
    console.log('button clicked')
})
