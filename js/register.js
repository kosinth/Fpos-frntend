
let divDisplay = document.getElementById('login');
divDisplay.style.display = 'none';

let registData={};

const onclicksubmit = async() =>{
    
    let messageresDom = document.getElementById('infor')
    messageresDom.className = 'message clear'

    try{

        let shopnameDom = document.querySelector('input[name=shopname]')
        let addrDom = document.querySelector('input[name=address]')
        let usrDom = document.querySelector('input[name=username]')
        let pswDom = document.getElementById('psw')
        //let pswRepeatDom = document.getElementById('psw-repeat')
        let emailDom = document.getElementById('email')
        let mobileDom = document.getElementById('mobile')
        let promtpayDom = document.getElementById('promtpay')
        //message errors

        registData = {
            shop_id: '',
            shop_name: shopnameDom.value,
            user_address: addrDom.value,
            user_name: usrDom.value,
            user_password: pswDom.value,
            user_email: emailDom.value,
            user_mobile: mobileDom.value,
            user_promptpay: promtpayDom.value
        }
        
        console.log('send RegistData : ',registData)
        const errors = validateData(registData)
        if(errors.length>0){
            throw {
                message : 'กรอกข้อมูลไม่ครบ',
                errors : errors
            }
            
        }

        showModal();

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

const validateData =(registData) =>{

    let errors=[]
    if (!registData.shop_name){
        errors.push('กรุณากรอกชื่อร้าน/ห้างร้าน')
    }
   
    if(!registData.user_address){
        errors.push('กรุณากรอกที่อยู่')
    }
    if (!registData.user_name){
        errors.push('กรุณากรอก User name สำหรับ login')
    }

    if (!registData.user_password){
        errors.push('กรุณากรอก รหัสผ่าน')
    }

    // if (!registData.regist_pswRepeat){
    //     errors.push('กรุณากรอก ยืนยันรหัสผ่าน')
    // }

    if (!registData.user_email){
        errors.push('กรุณากรอก e-mail')
    }

    if (!registData.user_mobile){
        errors.push('กรุณากรอก เบอร์มือถือ')
    }

    if (!registData.user_promptpay){
        console.log(' promt Pay : ',registData.regist_promtpay)
        errors.push('กรุณากรอก เลขบัญชี promt-pay')
    }else{
        numberin = registData.user_promptpay.replace(/,/g, '')
        let cnvttype = parseInt(numberin);
        if(cnvttype){
            // ok good
            //console.log( 'is Integer:  ' ,cnvttype)
        }else{
            //console.log( 'is String: ' ,cnvttype)
            console.log(' promt Pay : ',registData.user_promptpay)
            errors.push('กรุณากรอก เลขบัญชี promt-pay เป็นตัวเลข ')
            }
    }
    return errors

}

function formatNumber(currElement){

    let alert = document.getElementById('infor')
    alert.innerText = "";
    let numberin = currElement.value;
    numberin = numberin.replace(/,/g, '')
    let cnvttype = parseInt(numberin);
    if(cnvttype){
        console.log( 'is Integer:  ' ,cnvttype)
    }else{
        console.log( 'is String: ' ,cnvttype)
        //alert("It is not a integer");
       alert.style.color = "red";
       alert.style.fontWeight = 'blod';
       alert.innerText = "กรุณากรอก เลขบัญชี promt-pay เป็นตัวเลข";
    }

  }

  showModal=()=>{
    
    let domModual = document.getElementById('myModal')
    domModual.style.display='block'
    domModual.class='w3-button w3-black'

    let shopnameDom = document.querySelector('input[name=shopname]')
    let addrDom = document.querySelector('input[name=address]')
    let usrDom = document.querySelector('input[name=username]')
    let pswDom = document.getElementById('psw')
    //let pswRepeatDom = document.getElementById('psw-repeat')
    let emailDom = document.getElementById('email')
    let mobileDom = document.getElementById('mobile')

    let promtpayDom = document.getElementById('promtpay')


     document.getElementById('s_shopName').innerText  = shopnameDom.value
     document.getElementById('s_address').innerText    =addrDom.value
     document.getElementById('s_usrName').innerText = usrDom.value
     document.getElementById('s_pass').innerText = pswDom.value
     document.getElementById('s_Email').innerText = emailDom.value
     document.getElementById('s_mobile').innerText = mobileDom.value
     document.getElementById('s_promtpay').innerText = promtpayDom.value


  }


  sentConfirm = async()=>{

   let domModual = document.getElementById('myModal')
    domModual.style.display='none'

    let messageresDom = document.getElementById('infor')
    messageresDom.className = 'message clear'

    try{

        //let msg = 'บันทึกข้อมูลเรียบร้อย !'
        let msg = ''
        let alert = document.getElementById('infor')
        alert.innerText = "";

        const resp = await axios.post('http://localhost:5000/api/register',registData)
        console.log(resp.data)
        if(resp.data.data_code ==1){
            Swal.fire({
                title: `ชื่อเข้าระบบ login [ ${resp.data.user_name} ] มีผู้ใช้แล้ว...!`,
                icon: "warning"
            }); 
        }else{
            //
            console.log(resp.data.user_id + resp.data.password+ resp.data.shop_id);
            Swal.fire({
                title: `ลงทะเบียนสำเร็จ  \n รหัสร้านค้า ID : ${resp.data.shop_id } \n ชื่อเข้าระบบ  :  ${resp.data.user_id } \n  รหัส  :  ${resp.data.password }`,
                text: 'ระบบจะทำการส่งข้อมูลไปยัง E-mail กรุณาตรวจสอบข้อมูล',
                icon: 'success'
            }); 

            document.getElementById('btnsubmit').disabled = true
            document.getElementById('btnsubmit').style.backgroundColor = '#a6acaf';
            let divDisplay = document.getElementById('login');
            divDisplay.style.display = 'block';
            
        }
        // console.log('response : ', "  ===>"+response.message )

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