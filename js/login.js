
onLogin = ()=>{

    let messageresDom = document.getElementById('infor')
    messageresDom.className = 'message clear'

    try{

        let userNameDom = document.querySelector('input[name=username]')
        let PassDom = document.querySelector('input[name=password]')
        //message errors

        let loginData = {
            user_name: userNameDom.value,
            user_pass: PassDom.value,
        }
        
        console.log('send RegistData : ',loginData)
        const errors = validateData(loginData)
        if(errors.length>0){
            throw {
                message : 'กรอกข้อมูลไม่ครบ',
                errors : errors
            }
            
        }

        callLogIn(loginData);

    }catch(error){
         
        //console.log(' ERRR ' , error.message)
        let messageDOM = `มีปัญหาเกิดขึ้น ${error.message}`
        if (error.errors && error.errors.length > 0) {
            messageDOM = '<div>'
            messageDOM += `<div>${error.message}</div>`
            messageDOM += '<ul>'
            for (let i = 0; i < error.errors.length; i++) {
                messageDOM += `<li>${error.errors[i]}</li>`
            }
            messageDOM += '</ul>'
            messageDOM += '</div>'
        }
    
        messageresDom.innerHTML = messageDOM
        messageresDom.className = 'message danger'

    }

}

const validateData =(logIndata) =>{

    let errors=[]
    if (!logIndata.user_name){
        errors.push('กรุณากรอก User Name / ชื่อ')
    }
   
    if(!logIndata.user_pass){
        errors.push('กรุณากรอก Password / รหัส')
    }
    return errors

}

const callLogIn = async(logInData)=>{

    let messageresDom = document.getElementById('infor')
    messageresDom.className = 'message clear'
    
    try{

        const resp = await axios.post('http://localhost:5000/api/login',logInData)
        console.log(resp.data)
        if(resp.data.data_code ==0){
            Swal.fire({
                title: `User Name/ชื่อ  [ ${resp.data.user_name} ] ไม่ถูกต้อง...!`,
                icon: "error"
            }); 
        }else{
            //console.log(' xxx ',resp.data.password_status );
            if(resp.data.password_status==0){
                Swal.fire({
                    title: `Password / รหัส ไม่ถูกต้อง ...!   `,
                    icon: "error"
                }); 
            }else{
                // login succsss  go to main html 
                // console.log(resp.data.user_name)

                localStorage.setItem('token',resp.data.token)
                localStorage.setItem('shopId',resp.data.shopId)
                localStorage.setItem('shopName',resp.data.shopName)
                localStorage.setItem('user_name',resp.data.user_name)
                //location.replace('http://localhost:3000/main.html')
                Swal.fire({
                    title: `${resp.data.token}`,
                    icon: "success"
                }); 

            }    
            
        }

    }catch(error){
        
        //console.log(' ERRR ' , error.message)
        let messageDOM = `มีปัญหาเกิดขึ้น ${error.message}`
        if (error.errors && error.errors.length > 0) {
            messageDOM = '<div>'
            messageDOM += `<div>${error.message}</div>`
            messageDOM += '<ul>'
            for (let i = 0; i < error.errors.length; i++) {
                messageDOM += `<li>${error.errors[i]}</li>`
            }
            messageDOM += '</ul>'
            messageDOM += '</div>'
        }
        messageresDom.innerHTML = messageDOM
        messageresDom.className = 'message danger'
    }
}


