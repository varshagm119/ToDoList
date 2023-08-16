const inputForm = document.querySelector('#addForm');
const nameInput = document.querySelector('#name');
const descInput = document.querySelector('#description');

window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/798bf67962ef474091b847583c6e702f/AppointData")
         .then((res) => {
            
            for(var i=0;i<res.data.length;i++){
                //console.log(res.data[i])
                AddToDoList(res.data[i]);
            }
         })
         .catch(err =>{
            console.log(err)
         })
})

inputForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();
    if(nameInput.value == ''||descInput.value==''){
        alert("Enter the fields");
    }
    else{
        let myObj = {
            nameObj: nameInput.value,
            descObj: descInput.value,
            isDone: false
        };
        axios.post("https://crudcrud.com/api/798bf67962ef474091b847583c6e702f/AppointData",myObj)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
            console.log(error);
        })
        AddToDoList(myObj);
        nameInput.value='';
        descInput.value='';
    }
};

function AddToDoList(obj){
    let [name,desc] = [obj.nameObj,obj.descObj]
    if(obj.isDone === true){
        doneFun(name,desc)
    }
    else{
        let parentNode = document.querySelector('#items');
        let childHTML = `<li id=${obj.nameObj}>${obj.nameObj} --  ${obj.descObj}<button onclick=doneTask('${obj.nameObj}','${obj.descObj}','${obj.isDone}','${obj._id}')>done</button><button onclick=deleteTask('${obj.nameObj}','${obj.isDone}','${obj._id}')>delete</button></li>`;
       // let btnHTML = `<button>Hi</button>`
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
   
}

function doneTask(name,desc,isDone,id){
    let myObj = {
        nameObj: name,
        descObj: desc,
        isDone: true
    };
    axios.put(`https://crudcrud.com/api/798bf67962ef474091b847583c6e702f/AppointData/${id}`,myObj)
        .then()
        .catch(err => console.log(err))
    doneFun(name,desc);
    removeList(name);
}

function doneFun(name,desc){
    let parentNode = document.querySelector('#doneItems');
    let childHTML = `<li>${name} --  ${desc}</li>`;
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
}

function deleteTask(name,isDone,id){
    axios.delete(`https://crudcrud.com/api/798bf67962ef474091b847583c6e702f/AppointData/${id}`)
         .then()
         .catch(err => console.log(err))
    removeList(name);
}

function removeList(name){
    let parentNode = document.querySelector('#items');
    let childToBeRemoved = document.getElementById(name);
    parentNode.removeChild(childToBeRemoved);
}