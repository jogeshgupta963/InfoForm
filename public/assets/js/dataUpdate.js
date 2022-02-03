            const emailInp = document.querySelector(".email");
            const nameInp = document.querySelector(".name");
            const hobbiesInp = document.querySelector(".hobbies");
            const skillsInp= document.querySelector(".skills");

            const submitBtn = document.querySelector(".submitBtn");

            //post req for updating data;
            submitBtn.addEventListener("click",async(e)=>{
               
                e.preventDefault();
                let email = emailInp.value;
                let name  = nameInp.value;
                let hobbies= hobbiesInp.value;
                let skills = skillsInp.value;
                let isValid = await axios.put("/info/form/edit",{
                    name,
                    email,
                    hobbies,
                    skills
                })

                
                const  result=document.querySelector(".result")
                let msg="";
                    // result.innerText = "Credentials Updated successfully"; 
                if(isValid.data.valid){
                    console.log("if")
                    result.innerText = 'Credentials Updated successfully';
                    result.style.color="green"
                
                }
                else{
                    console.log("else")
                    result.innerText = 'Your data not found';
                    result.style.color="red"
                

                }
                
                
            })