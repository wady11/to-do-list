"use strict";
const all = "ALL"
const active = "ACTIVE"
const complete = "COMPLETE"

let edit = false;
let currenteditinid = undefined;
let itemdisplay = all;


//funcion asincrona agrega informacion al servicio
async function createtodo(){

    //tomando valor del input
    const  wishlist = $('#wishlist');

    //si el valor esta diferente de vacion agrego al objeto
    if(wishlist.val() != ""){
       

        if(edit){
            let todo =  await todoservice.GetAllToId(currenteditinid);
            todo.title = wishlist.val();
            await todoservice.updatetodo(currenteditinid, todo);
            edit = false;
            currenteditinid = undefined;
        }
        else{
            let todolist = {
                title : wishlist.val()
            }
            const saved = await todoservice.addtodo(todolist);
            
        }
        
        wishlist.val("");
        refrechItemslist();
    }

}
  

    async function refrechItemslist(){

          //seleccionamos el item
         const itemlist = $(".item-list");
        let todos = await todoservice.getalltodo();


             switch(itemdisplay){

                case 'ACTIVE': 
                    todos = todos.filter(todo =>{
                      return  todo.complete == false;
                    })
                break;

                case 'COMPLETE':
                     todos = todos.filter((todo)=>{
                           return  todo.complete == true;
                     })   

                break;


             }


          //limpia para evitar que se repite      
        itemlist.html('');
            for( let todo of todos){
                const baseElement  = `<li>               
                <i class="fa ${todo.complete ? 'fa fa-check-circle' : 'fa fa-circle-o'}" onclick="setitemcomplete(${todo.id})" ></i> 
                <span class="${todo.complete ? "item-tachado" : ""}">${todo.title}</span>
                <i onclick="onitemedit(${todo.id})" class="fa fa-edit"></i>                   
                <i onclick="onitemdelete(${todo.id})" class="fa fa-times"></i>
                </li>`
                $(itemlist).append(baseElement);

                console.log(todo.complete);
                
            }

            
    }


    async function onitemdelete(id){
        const data = await todoservice.removetodo(id);
        refrechItemslist();
        console.log(data);
    }
    

    async function setitemcomplete(id){
        const todo = await todoservice.GetAllToId(id);
        if(todo.complete){
            todo.complete = false;
        }
        else{
            todo.complete = true;

        }

        const newtodo = await todoservice.updatetodo(id,todo);

        refrechItemslist();
    }

    async function onitemedit(id){
        const todo = await todoservice.GetAllToId(id);
        const  wishlist = $('#wishlist');
        wishlist.val(todo.title);
        edit = true;
        currenteditinid = id;
        
    }


    //funcion que selecciona la funcion para filtrar
    function filter(type){
        itemdisplay = type;
        refrechItemslist();
    }





    document.addEventListener('DOMContentLoaded',async function(){
       
        refrechItemslist();


    });//DOM CONTENT LOADED




console.log(3);