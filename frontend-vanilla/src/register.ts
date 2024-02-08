const reg_form = document.getElementById("registrationForm") as HTMLFormElement

const user_name = document.getElementById("name") as HTMLInputElement
const user_email = document.getElementById("email") as HTMLInputElement
const user_phone_number = document.getElementById("phone_number") as HTMLInputElement
const user_role = document.getElementById("role") as HTMLSelectElement
const user_location = document.getElementById("location") as HTMLInputElement
const user_Password = document.getElementById("Password") as HTMLInputElement

let successmsg = document.querySelector('.success-msg') as HTMLParagraphElement
successmsg.style.display='none'

reg_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let name = user_name.value.trim()
    let email = user_email.value.trim()
    let phone_number = user_phone_number.value.trim()
    let role = user_role.value.trim()
    let location = user_location.value.trim()
    let Password = user_Password.value.trim()

    let user = name !== '' && email !== '' && phone_number !== '' && role !== '' && location !== '' && Password !== ''

    if(user){        
        let promise = new Promise <{error:string, message:string}>((resolve, reject)=>{
            fetch('http://localhost:4100/users', {
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "phone_number": phone_number,
                    "role": role,
                    "location": location,
                    "password": Password
                })
            }).then((res=>res.json())).then(res=>{
                console.log(res);
                successmsg.textContent = res.message
                successmsg.style.display = 'flex'
                
                setTimeout(() => {
                    successmsg.style.display = 'none'
                    navigateToLogin()
                }, 3000);

                

                resolve(res)
            }).catch(error=>{
                console.log(error);
                
            })
        })

        function navigateToLogin(){
            window.location.href = 'login.html'
        }
    }

})