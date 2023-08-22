const inputForm = document.querySelector('#addForm');
const nameInput = document.querySelector('#name');
const descInput = document.querySelector('#description');

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
       
        AddToDoList(myObj);
        nameInput.value='';
        descInput.value='';
    }
};


function AddToDoList(obj){
    let [name,desc] = [obj.nameObj,obj.descObj]
    if(obj.isDone === true){
       // doneFun(name,desc)
    }
    else{
        let descWrap = obj.descObj.replace(/ /g,"_");
        let parentNode = document.querySelector('#items');
        let childHTML = `<li id=${obj.nameObj}>${obj.nameObj} --  ${obj.descObj}
        <button onclick=doneTask('${obj.nameObj}','${descWrap}','${obj.isDone}','${obj._id}')>done</button>
        <button onclick=deleteTask('${obj.nameObj}','${obj.isDone}','${obj._id}')>delete</button></li>`;
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
    doneFun(name,desc);
    removeList(name);
}

function doneFun(name,desc){
    let descUnwrap = desc.replace("_"," ");
    let parentNode = document.querySelector('#doneItems');
    let childHTML = `<li>${name} --  ${descUnwrap}</li>`;
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
}

function deleteTask(name,isDone,id){
   
    removeList(name);
}

function removeList(name){
    let parentNode = document.querySelector('#items');
    let childToBeRemoved = document.getElementById(name);
    parentNode.removeChild(childToBeRemoved);
}
