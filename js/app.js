//UI
const form=document.getElementById('task-form');
const taskinput=document.getElementById('task');
const filter=document.getElementById('filter');
const tasklist=document.querySelector('.collection');
const clearbtn=document.querySelector('.clear-tasks');


// Event Listener
//Add Task
form.addEventListener('submit',addtask);
//Remove Task
tasklist.addEventListener('click',removetask);
//Clear Tasks
clearbtn.addEventListener('click',cleartasks);
document.addEventListener('DOMContentLoaded',gettasks);
//Filter task event
filter.addEventListener('keyup',filtertasks);


function addtask(e){
    e.preventDefault();
   
    if(taskinput.value===''){
        window.alert("Add a task");
        return;
    }
    // else{
    const li=document.createElement('li');
    //add class
    li.className="collection-item";
    
    //create textnode append to li
    li.appendChild(document.createTextNode(taskinput.value));
    
    //create link
    const link=document.createElement('a');
    //add class
    link.className="delete-item secondary-content";

    //add icon
    link.innerHTML=`<i class="far fa-trash-alt"></i>`;
    
    // console.log(link);
    
    //append link to li
    li.appendChild(link);
    //append li to ul
    tasklist.appendChild(li);
    // console.log(tasklist);
    // }

    storetaskinlocalstorage(taskinput.value);
}

function removetask(e){
    // console.log(e.target.parentElement);
                //    i       a          li
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
        } 
      
    }
    

    //Remove task from localstorage
    removetaskfromlocalstorage(e.target.parentElement.parentElement);

}


//Clear Tasks
function cleartasks(){
    // console.log(tasklist);
    //Method1 
    // tasklist.innerHTML='';


    //Method2
    // console.log(tasklist);
    // console.log(tasklist.childElementCount);
    // let x=0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
      
    // }

    //Method 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
     
    //Clear All data from localstorage
    cleartasksfromlocalstorage();
}

//Store Task
function storetaskinlocalstorage(task){
    // console.log(task);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//get tasks from localStorage
function gettasks(){
    // console.log('hey');
    if(localStorage.getItem('tasks')===null){
         tasks=[];
    }
    else{
         tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task)=>{
        // console.log(task);
        // create li element
        const li=document.createElement('li');
        //add class
        li.className='collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // console.log(li);

        //create new link element
        const link=document.createElement('a');
        //add class
        link.className="delete-item secondary-content";
        //add icon
        link.innerHTML=`<i class="far fa-trash-alt"></i>`;
       
        // append link into li
        li.appendChild(link);

        //append li to ul
        tasklist.appendChild(li);
    });
}

//Remove task from localstorage
function removetaskfromlocalstorage(taskitem){
    // console.log(taskitem.textContent);

    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{
        console.log(task);
        if(taskitem.textContent===task){
            // where we want to start(index) , where we want to end(how many)
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

//Clear All Data From Local Storage
function cleartasksfromlocalstorage(){
    localStorage.clear();
}


//Filter Tasks
function filtertasks(e){
    // console.log(e.target.value);
    const inputfilter=e.target.value.toLowerCase();
    
    const tasks=document.querySelectorAll('.collection-item');
    tasks.forEach((task)=>{
        // console.log(task);

        // const item=task.textContent.toLowerCase();
        const item=task.firstChild.textContent.toLowerCase();
        // console.log(item);

        if(item.indexOf(inputfilter) !== -1){
            task.style.display="block";
        }else{
            task.style.display="none";
        }
    })
} 


