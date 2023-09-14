const fetching = (addr = '', one, two) => {
    fetch('/weather?address='+addr).then((response) => {
    response.json().then((data) => {
        if(data.error){
            one.textContent = data.error
        } else {
            one.textContent = data.location
            two.textContent = data.forcast
        }
    })
})
}

const weatherForm = document.querySelector('form')
const searchElem = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElem.value
    
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetching(location, messageOne, messageTwo)
})