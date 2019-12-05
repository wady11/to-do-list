'use strict';

const HOST = 'http://5dbb9f3d3ec5fb0014319eaf.mockapi.io';
//la marcamos async por utilizaremos la keyword await
//si no especifico que la funcion es async no me va a funcionar el await y me dara un error

const getalltodo = () => {
    //marco la funcion async
    return new Promise(async(resolve, reject) => {
        //el try es un controlador de errores, siempre usar cuanod se hace peticiones json
        //fetch con el fecth recupero recursos, por defecto me envia las peticiones de tipo get
        try {
            //esperamos la respuesta del endpoint y la convierte un fetch  
            //despues esperamos y transformamos la respuesta en un json

            const response = await fetch(`${HOST}/todo`); //respuesta del endpoint
            const data = await response.json(); //espera la respuesta y la convierte a json
            resolve(data); // y envia el resolve si es un 200 

            // console.log(data);

        } catch (error) {

            reject(error); //envia el error si es un error

        }

    })
}

//ponemos una funcion constante por que ese valor no va a cambiar 
const GetAllToId = (id) => {

        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`${HOST}/todo/${id}`);
                const data = await response.json();
                resolve(data);
                console.log(response);

            } catch (error) {
                reject(error);
            }

        })

    }
    //metodo para agregar
const addtodo = (todo) => {

    return new Promise(async(resolve, reject) => {
        const init = {
            //usamos body y header siempre y cuando el metodo sea post o put 
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                "content-type": "application/json"
            }
        }

        try {
            const response = await fetch(`${HOST}/todo`, init)
            const data = response.json();
            resolve(data);

        } catch (error) {

            reject(error);

        }
    })
}

//metodo para borrar
const removetodo = (id) => {
    return new Promise(async(resolve, reject) => {
        //en el caso de delete y get no utilizamos body ni header 
        const init = {
            method: 'DELETE'
        }
        try {
            const response = await await fetch(`${HOST}/todo/${id}`, init);
            const data = await response.json();
            resolve(data);

        } catch (error) {
            reject(error);
        }

    })
}

//actualizar metodo

const updatetodo = (id, todo) => {
    return new Promise(async(resolve, reject) => {

        let init = {
            method: "Put",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`${HOST}/todo/${id}`, init)
            const data = await response.json();
            resolve(data);

            console.log(data)

        } catch (error) {
            reject(error);
        }
    })
}

//crear un objeto para asi saber de donde viene cada una
const todoservice = {
    getalltodo,
    GetAllToId,
    addtodo,
    removetodo,
    updatetodo
}
