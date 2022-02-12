// const
const _todoForm = document.getElementById('todo-Form')
const _todoListContainer = document.getElementById('todoListContainer')
const _todoTemplate = document.getElementById('todo-Template').content
const alert = document.querySelector('.alert')

let todosdb = []

// events



// function
const addTodo = (todo) => {
    const todoObject = {
        nombre : todo,
        //`${Date.now()}` porque dataset solo almacena string 
        id : `${Date.now()}`
    }
    todosdb.push(todoObject)
}

const printTodo = () =>{
    localStorage.setItem('todosdb', JSON.stringify(todosdb))
    // localStorage.setItem('carrito', JSON.stringify(carrito))

    // limpiamos el _todoListContainer
    _todoListContainer.textContent = ''
    // creamos una fragment
    const fragment = document.createDocumentFragment()
    // recorremos todosdb
        todosdb.forEach( item => {
        //  creamos un clone
        const clone = _todoTemplate.cloneNode(true)
        // seleccionamos del fragment el <p> y pintamos todo
        clone.querySelector('p').textContent = item.nombre
        clone.querySelector('.btn').dataset.id = item.id 

        fragment.appendChild(clone)
    });
    // 
    _todoListContainer.appendChild(fragment)

}
// events

_todoForm.addEventListener('submit', (e) =>{
    alert.classList.add('d-none')

    e.preventDefault()
    // console.log('diste click')
    const data = new FormData(_todoForm)
    // [...data.values()] devuelve un array con los valores del formulario
    const [todo] = [...data.values()]
    if(!todo.trim()){
        console.log('todo vacio')
        alert.classList.remove('d-none')
        return
    }else{
    addTodo(todo)
    printTodo()
    console.log('todo agregado :',todo);
    }

    // Limpia el formulario una vez que se envia el todo
    _todoForm.reset()
    console.log(todosdb)
})

// events 2
document.addEventListener('click', (e) =>{
    // console.log(e.target.dataset);
    // console.log(e.target.matches('.btn-danger'));
    if(e.target.matches('.btn-danger')){
        //filtramos los items.id de todosdb que no tengan el mismo id y lo eliminamos 
        todosdb = todosdb.filter(item => item.id !== e.target.dataset.id)
            printTodo()
    }
})

// events 3

document.addEventListener('DOMContentLoaded',(e)=>{
    const storage = JSON.parse(localStorage.getItem('todosdb'))
    if(storage){
        todosdb = storage;
        printTodo()
    }
})
