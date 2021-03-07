const weatherform =document.querySelector('form')
const search =document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageone.textContent='loading...'
    messagetwo.textContent=''
    const location = search.value
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(location)
        if(data.error)
        {
            messageone.textContent=data.error
        }    
        else{
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
        }
    })
})
})