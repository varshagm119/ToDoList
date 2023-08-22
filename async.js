const inputForm = document.querySelector('#addForm');
const nameInput = document.querySelector('#name');
const descInput = document.querySelector('#description');




window.addEventListener("DOMContentLoaded",async () => { 
    try {
        const res = await axios.get("https://crudcrud.com/api/b2e70919822a48bf8f0f493866e34222/AppointData");
        for(var i=0;i<res.data.length;i++){
            AddToDoList(res.data[i]);
        }
    } catch (error) {
        console.log(error)
    }
})


inputForm.addEventListener('submit',onSubmit);

async function onSubmit(e){
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
        try{
            const response = await axios.post("https://crudcrud.com/api/b2e70919822a48bf8f0f493866e34222/AppointData",myObj)
            console.log(response)
        }catch(error){
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
            console.log(error);
        }
        
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
        let descWrap = obj.descObj.replace(/ /g,"_");
        let parentNode = document.querySelector('#items');
        let childHTML = `<li id=${obj.nameObj}>${obj.nameObj} --  ${obj.descObj}
        <button onclick=doneTask('${obj.nameObj}','${descWrap}','${obj.isDone}','${obj._id}')>done</button>
        <button onclick=deleteTask('${obj.nameObj}','${obj.isDone}','${obj._id}')>delete</button></li>`;
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
   
}

async function doneTask(name,desc,isDone,id){
    try{
    let myObj = {
        nameObj: name,
        descObj: desc,
        isDone: true
    };
        
    console.log("hit")
    if(id){
        await axios.put(`https://crudcrud.com/api/b2e70919822a48bf8f0f493866e34222/AppointData/${id}`,myObj);

         } 
    }catch (error) {
                console.log(error)
    }
    doneFun(name,desc);
    removeList(name);
}

function doneFun(name,desc){
    let descUnwrap = desc.replace("_"," ");
    let parentNode = document.querySelector('#doneItems');
    let childHTML = `<li>${name} --  ${descUnwrap}</li>`;
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
}

async function deleteTask(name,isDone,id){
    try{
        //console.log(id)
    if(id!="undefined"){
        await  axios.delete(`https://crudcrud.com/api/b2e70919822a48bf8f0f493866e34222/AppointData/${id}`)
    }
    }
    catch (error) {
        console.log(error)
    }
    removeList(name);
    
}

function removeList(name){
    let parentNode = document.querySelector('#items');
    let childToBeRemoved = document.getElementById(name);
    parentNode.removeChild(childToBeRemoved);
}

