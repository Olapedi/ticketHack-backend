const btn = document.querySelector('#btn')
const date = document.querySelector('#date')

const mongoose = 

btn.addEventListener('click',function(){
    console.log(date.value)
    console.log(typeof date.value)
    date0= new Date(`${date.value}`)
    console.log(date0)
    console.log(typeof date0)
})