 
 
 //btns
 const btn = document.querySelector(".btn");
 const searchBtn = document.querySelector('.search-btn');
 const editBtn = document.querySelector('.edit-btn');
 const deleteBtn = document.querySelector('.delete');

 
 //divs
 const nameDiv = document.querySelector(".name-div");
 const emailDiv = document.querySelector(".email-div");
 const hobbiesDiv = document.querySelector(".hobbies-div");
 const skillsDiv = document.querySelector(".skills-div");



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
   e.preventDefault();
   const searchBar = document.querySelector(".search-bar").value;
   
   let formInfo = await axios.post("/info/form/search",{searchBar});
   
   
   
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
         div.innerText = "Data not found"
        //  document.querySelector(".container").appendChild(div)
       }
      
       btn.style.display="none"
       searchBtn.style.display="none"
       editBtn.style.display="none"
       deleteBtn.style.display="none"
  })
 
  //submitting
 
  btn.addEventListener("click", async function (e) {
   e.preventDefault();

   
   const name = document.querySelector(".name").value;
   const email = document.querySelector(".email").value;
   const hobbies = document.querySelector(".hobbies").value;
   const skills = document.querySelector(".skills").value;

   
   if(name == "" ){
     nameDiv.style.display="block";
     nameDiv.innerText = "Enter Your Name!!!";
     nameDiv.style.color="red";
   }
   if(email == "" ){
     emailDiv.style.display="block";
     emailDiv.innerText = "Enter Your email!!!";
     emailDiv.style.color="red";
   }
   if(hobbies == "" ){
     hobbiesDiv.style.display="block";
     hobbiesDiv.innerText = "Enter Your hobbiess!!!";
     hobbiesDiv.style.color="red";
   }
   if(skills == "" ){
     skillsDiv.style.display="block";
     skillsDiv.innerText = "Enter Your skills!!";
     skillsDiv.style.color="red";
   }
   
   if(name != "" || email !="" || hobbies !="" || skills !=""){
     let isValid = await axios.post("/info/form", {
       name,
       email,
       hobbies,
       skills,
       search:false
     });
     console.log(isValid)
     let msg =document.querySelector(".msg")
     if(isValid.data.unique){
       msg.innerText = "Credentials Uploaded successfully"            
     }
     else{
       msg.innerText="Your emailId already exists"
     }
   }
   
 });

 
 