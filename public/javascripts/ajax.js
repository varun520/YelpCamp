// const axios = require('axios');
const username = document.querySelector('#username')
console.log('hello')
username.addEventListener('focusout', async () => {
    // const config = { params: { uname : username.value } }
    console.log(username.value)
    const resp = await fetch('/username', {method: 'POST', body: JSON.stringify({uname: username.value})})
    const resp2 = await resp.json()
    console.log(resp2)
    if(resp2.msg === true){
        const para = document.createElement('p');
        const body = document.body;
        para.innerHTML = 'username taken';
        body.append(para)
        
    }
})