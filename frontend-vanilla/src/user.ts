let user_id = localStorage.getItem('user_id') as string
const token = localStorage.getItem('token') as string

let promise3 = new Promise((resolve, reject)=>{
    fetch(`http://localhost:4100/trips/customer/${user_id}`,{
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'token': token
        }, 
        method: "GET"
    }).then(res=>{
        resolve(res.json())
    }).catch(err=>{
        reject(err)
    })
}).then(data=>{
    console.log(data);
    
})