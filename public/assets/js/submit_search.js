 
 
 //btns
 const btn = document.querySelector(".btn");
 const searchBtn = document.querySelector('.search-btn');
 const editBtn = document.querySelector('.edit-btn');
 const deleteBtn = document.querySelector('.delete');
 const backBtn = document.querySelector('.back-btn');

 
 //divs
 const nameDiv = document.querySelector(".name-div");
 const emailDiv = document.querySelector(".email-div");
 const hobbiesDiv = document.querySelector(".hobbies-div");
 const skillsDiv = document.querySelector(".skills-div");


backBtn.style.display="none"
 const divArr = [nameDiv,emailDiv,hobbiesDiv,skillsDiv];
 divArr.forEach(element => {
     element.style.display="none";
 });

 //prevent default on form

 document.querySelector(".container").addEventListener("submit",(e)=>{
   
   e.preventDefault();
 })
 
 //search
 
  searchBtn.addEventListener("click",async function(e){
   document.querySelector(".msg").innerText=""
   e.preventDefault();
    document.querySelector(".search-bar").style.display="none"
    searchBtn.style.display="none"
   const searchBar = document.querySelector(".search-bar").value;
   let formInfo = await axios.post("/info/form/search",{searchBar});
   if(searchBar == ""){
     alert("enter a field to search")
   }
   
   else{
   
   const name = document.querySelector(".name");
   const email= document.querySelector(".email");
   const hobbies = document.querySelector(".hobbies");
   const skills = document.querySelector(".skills");
   let inputArr=[name,email,hobbies,skills];
   inputArr.forEach(element => {
     element.style.display="none";
   });
   
   if(formInfo.data.valid){
        divArr.forEach(element => {
           element.style.display="block";
           });
         nameDiv.innerHTML = formInfo.data.foundData.name;
         emailDiv.innerHTML = formInfo.data.foundData.email;
         hobbiesDiv.innerHTML = formInfo.data.foundData.hobbies;
         skillsDiv.innerHTML = formInfo.data.foundData.skills;
         }
         else{

           divArr.forEach(element => {
           element.style.display="none";
           });
           let labels=document.querySelectorAll(".label")
           labels.forEach(element => {
               element.style.display="none";
           });

         let div= document.querySelector(".msg")
         div.value="";
         div.style.display="inline-block"
         div.innerText = "Data not found"
        //  document.querySelector(".container").appendChild(div)
       }
      
       btn.style.display="none"
       
       editBtn.style.display="none"
       deleteBtn.style.display="none"
       backBtn.style.display="inline-block"
      }
  })
 
  //submitting
 
  btn.addEventListener("click", async function (e) {
   e.preventDefault();

   
  
   const name = document.querySelector(".name").value;
   const email = document.querySelector(".email").value;
   const hobbies = document.querySelector(".hobbies").value;
   const skills = document.querySelector(".skills").value;

   const nameErr = document.querySelector(".name-err")
   const emailErr = document.querySelector(".email-err")
   const hobbiesErr = document.querySelector(".hobbies-err")
   const skillsErr = document.querySelector(".skills-err")
   if(name == "" ){
     nameErr.style.display="block";
     nameErr.innerText = "Enter Your Name!!!";
     nameErr.style.color="red";
   }
   if(email == "" ){
     emailErr.style.display="block";
     emailErr.innerText = "Enter Your email!!!";
     emailErr.style.color="red";
   }
   else if(!email.includes("@")){
    emailErr.style.display="block";
    emailErr.innerText = "Invalid email";
    emailErr.style.color="red";
   }
   if(hobbies == "" ){
     hobbiesErr.style.display="block";
     hobbiesErr.innerText = "Enter Your hobbiess!!!";
     hobbiesErr.style.color="red";
   }
   if(skills == "" ){
     skillsErr.style.display="block";
     skillsErr.innerText = "Enter Your skills!!";
     skillsErr.style.color="red";
   }
   
   if(name != "" && email !="" && hobbies !="" && skills !="" && email.includes("@")){
     let isValid = await axios.post("/info/form", {
       name,
       email,
       hobbies,
       skills,
       search:false
     });
     
     let msg =document.querySelector(".msg")
     if(isValid.data.unique){
       msg.innerText = "Credentials Uploaded successfully"            
     }
     else{
       msg.innerText="Your emailId already exists"
     }
   }
   
 });

//  backBtn
  backBtn.addEventListener("click",()=>{

    //divss
    divArr.forEach(element => {
        element.style.display="none";
    })
    //inputs
        const name = document.querySelector(".name");
         const email= document.querySelector(".email");
        const hobbies = document.querySelector(".hobbies");
       const skills = document.querySelector(".skills");
      let inputArr=[name,email,hobbies,skills];
         inputArr.forEach(element => {
        element.style.display="flex";
        });
        //labels
        let labels=document.querySelectorAll(".label")
        labels.forEach(element => {
            element.style.display="inline-block";
        });

        //btns
        btn.style.display="inline-block"
       searchBtn.style.display="inline-block"
       editBtn.style.display="inline-block"
       deleteBtn.style.display="inline-block"
       backBtn.style.display="none"
       //msg
       let div= document.querySelector(".msg")
       div.innerText="";
      
  }) 