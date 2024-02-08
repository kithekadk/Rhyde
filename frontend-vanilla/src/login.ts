let login_form = document.getElementById('loginForm') as HTMLFormElement

let users_email = document.getElementById('email') as HTMLInputElement
let email_error_msg = document.getElementById('email-error') as HTMLParagraphElement
email_error_msg.style.display = 'none'

let users_password = document.getElementById('password') as HTMLInputElement

login_form.addEventListener('submit', (e)=>{
    e.preventDefault()

    let email = users_email.value.trim()
    let password = users_password.value.trim()

    // announce empty email value
    if (email == ''){
        users_email.style.border = 'red solid 1px'
        email_error_msg.style.display = 'flex'
        email_error_msg.style.alignSelf = 'left'
        email_error_msg.style.color = 'red'
        email_error_msg.textContent = 'Email is required'
    }else{
        users_email.style.border = 'black solid 1px'
        email_error_msg.style.display = 'none'
        email_error_msg.textContent = ''
    }

    // announce empty email value
    if (password == ''){
        users_password.style.border = 'red solid 1px'
    }else{
        users_password.style.border = 'black solid 1px'
    }

    let login_details = email !== '' && password !== ''

    if(login_details){
        const promise2  = new Promise <{error?:string, message?:string, token?:string}>((resolve, reject)=>{

        fetch('http://localhost:4100/auth/login', {
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);

            localStorage.setItem("token", data.token)

            redirect()

            resolve(data)
        })
        })  
    }

    function redirect(){
        const token = localStorage.getItem('token') as string

        new Promise <{info:{
            user_id?:string,
            name?: string,
            email?: string,
            phone_number?: string,
            role?: string,
            isWelcomed?: boolean
        }}>((resolve, reject)=>{
            fetch('http://localhost:4100/auth/checkdetails', {
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'token': token
                },
                method: "POST"
            }).then(res=>{   
                resolve(res.json())
            }).catch(error=>{
                reject(error)
            })
        }).then(data=>{
            console.log(data.info);
            
            if(data.info.role === 'driver'){
                localStorage.setItem('user_id', data.info.user_id!) 
                window.location.href = 'driverdashboard.html'
            }else if(data.info.role === 'customer'){
                localStorage.setItem('user_id', data.info.user_id!) 
                window.location.href = 'userdashboard.html'
            }
        })
    }


})