'use strict'
 
window.addEventListener('load', () => {
    const form = document.getElementById('task-form')
    const input = document.getElementById('task-input')
    const listOfTasks = document.getElementById('task-container')

    // localStorage.removeItem("taskList");

    let taskObj = JSON.parse(localStorage.getItem('taskList'))
    if (taskObj) { //checking to see if there is a task already
        Object.entries(taskObj).forEach(el => { //obj.entries turns an object to an array of arrays! for you there spying my codes
        
            const taskEl = document.createElement('div') //allows us create dom notes
            taskEl.classList.add('task')
    
            const taskContentEl = document.createElement('div')
            taskContentEl.classList.add('task-content')
            taskEl.appendChild(taskContentEl)
    
            const taskInputEl = document.createElement('input')
            taskInputEl.classList.add('text')
            taskInputEl.type = 'text'
            taskInputEl.value = el[1]
            taskInputEl.setAttribute('readonly', 'readonly')
    
            taskContentEl.appendChild(taskInputEl)
    
            const taskActionsBtnsEl = document.createElement('div')
            taskActionsBtnsEl.classList.add('task-actions')
    
            const taskEditBtnEl = document.createElement('button')
            taskEditBtnEl.setAttribute('id', el[0]) 
            taskEditBtnEl.classList.add('edit')
            taskEditBtnEl.innerHTML = 'Edit'
    
            const taskDeleteBtnEl = document.createElement('button')
            taskDeleteBtnEl.setAttribute('id', `D${(el)[0]}`)

            taskDeleteBtnEl.classList.add('delete')
            taskDeleteBtnEl.innerHTML = 'Delete'
    
            taskActionsBtnsEl.appendChild(taskEditBtnEl)
            taskActionsBtnsEl.appendChild(taskDeleteBtnEl)
    
            taskEl.appendChild(taskActionsBtnsEl)
    
            listOfTasks.appendChild(taskEl)
        
            input.value = ''
    
            taskEditBtnEl.addEventListener('click', (e) => {
                if (taskEditBtnEl.innerText.toLowerCase() == 'edit') {
                    taskEditBtnEl.innerText = 'Save'
                    taskInputEl.removeAttribute('readonly') 
                    taskInputEl.focus()
                }
                else {
                    taskInputEl.setAttribute('readonly', 'readonly')
                    taskEditBtnEl.innerText = 'Edit'
                    let id = e.target.id
                    let taskObj = JSON.parse(localStorage.getItem('taskList'))
                    taskObj[id] = taskInputEl.value           
                    localStorage.setItem('taskList', JSON.stringify(taskObj))
                }   
            })
            taskDeleteBtnEl.addEventListener('click', (e) => {
                listOfTasks.removeChild(taskEl)
                let taskObj = JSON.parse(localStorage.getItem('taskList'))
                let id = e.target.id.slice(1)
                delete taskObj[id]
                localStorage.setItem('taskList', JSON.stringify(taskObj))
            })
       
        });
    }

    //form
    form.addEventListener('submit', (event) => {
        event.preventDefault() //stops it from refreshing the page
        const inputedtask = input.value

        let randomId = Math.random().toString().slice(2,8)
      
        if (!localStorage.getItem('taskList')) {
            let taskObj = {[randomId]:inputedtask}
            localStorage.setItem('taskList', JSON.stringify(taskObj))
        } else {
            let taskObj = JSON.parse(localStorage.getItem('taskList'))
            taskObj[randomId] = inputedtask            
            localStorage.setItem('taskList', JSON.stringify(taskObj))
        }


        const taskEl = document.createElement('div') //allows us create dom notes
        taskEl.classList.add('task')

        const taskContentEl = document.createElement('div')
        taskContentEl.classList.add('task-content')
        taskEl.appendChild(taskContentEl)

        const taskInputEl = document.createElement('input')
        taskInputEl.classList.add('text')
        taskInputEl.type = 'text'
        taskInputEl.value = inputedtask
        taskInputEl.setAttribute('readonly', 'readonly') //prevents editing

        taskContentEl.appendChild(taskInputEl)

        const taskActionsBtnsEl = document.createElement('div')
        taskActionsBtnsEl.classList.add('task-actions')
        
        const taskEditBtnEl = document.createElement('button')
        taskEditBtnEl.classList.add('edit')
        taskEditBtnEl.setAttribute('id', `${randomId}`)

        taskEditBtnEl.innerHTML = 'Edit'

        const taskDeleteBtnEl = document.createElement('button')
        taskDeleteBtnEl.classList.add('delete')
        taskDeleteBtnEl.setAttribute('id', `D${randomId}`)
        
        taskDeleteBtnEl.innerHTML = 'Delete'

        taskActionsBtnsEl.appendChild(taskEditBtnEl)
        taskActionsBtnsEl.appendChild(taskDeleteBtnEl)

        taskEl.appendChild(taskActionsBtnsEl)

        listOfTasks.appendChild(taskEl)
    
        input.value = ''

        taskEditBtnEl.addEventListener('click', (e) => {
            if (taskEditBtnEl.innerText.toLowerCase() == 'edit') {
                taskEditBtnEl.innerText = 'Save'
                taskInputEl.removeAttribute('readonly') 
                taskInputEl.focus()
            }
            else {
                taskInputEl.setAttribute('readonly', 'readonly')
                taskEditBtnEl.innerText = 'Edit'
                let id = e.target.id
                let taskObj = JSON.parse(localStorage.getItem('taskList'))
                taskObj[id] = taskInputEl.value           
                localStorage.setItem('taskList', JSON.stringify(taskObj))
            }   
        })
        taskDeleteBtnEl.addEventListener('click', (e) => {
            let taskObj = JSON.parse(localStorage.getItem('taskList'))
            let id = e.target.id.slice(1)
            delete taskObj[id]
            localStorage.setItem('taskList', JSON.stringify(taskObj))
            listOfTasks.removeChild(taskEl)

        })

    })
    
})
