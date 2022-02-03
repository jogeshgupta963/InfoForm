const otpBtn = document.querySelector(".otpBtn")
const submitBtn= document.querySelector(".submitBtn")

submitBtn.style.display="none";

const msg = document.querySelector(".msg")
document.querySelector(".container").addEventListener("submit", (e) => {
    e.preventDefault();
})



//sending otp
otpBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    let email = document.querySelector(".email").value;
    if(email === ""){
        msg.innerText = "Enter a valid email Address"
        msg.style.color="red"
    }
    else{
    let verify = await axios.post("/info/form/delete", { email });
    msg.innerText = "An otp has been sent to "+email;
    otpBtn.innerHTML ="Resend"
    submitBtn.style.display="block"
    }
})
//submit btn
submitBtn.addEventListener("click",async(e)=>{

    let email = document.querySelector(".email").value;
    let otp = document.querySelector(".otpSearch").value;
    let data = {email,otp}
    if(otp == ""){
        msg.innerText ="Invalid Otp"
        msg.style.color="red"
    }
    else{
    let verify = await axios.delete("/info/form/delete",{data})
    if(verify.data.status){
        msg.innerText = "Data Deleted Successfully"
        msg.style.color="green"
    }
    else{
        msg.innerText = "Invalid OTP or your details doesnt exist "
        msg.style.color="red"
    }
    }
})