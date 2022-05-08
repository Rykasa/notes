const notepadText = document.querySelector('.notepad-text')
const addBtn = document.querySelector('.add-btn')
const editBtn = document.querySelector('.edit-btn')
const deleteBtn = document.querySelector('.delete-btn')
const notes = document.querySelector('.notes-wrapper')

let noteList = []

addBtn.addEventListener('click', ()=>{
    if(notepadText.value.trim() === ''){
        notepadText.parentElement.previousElementSibling.classList.add('error-message')
    }else{
        notepadText.parentElement.previousElementSibling.classList.remove('error-message')
        const noteText = notepadText.value
        if(JSON.parse(localStorage.getItem('notesCollection')) !== null){
            noteList = JSON.parse(localStorage.getItem('notesCollection'))
            const noteHTML = '<div class="note"><div class="note-text">' + noteText + '</div></div>'
            noteList.push(noteHTML)
            localStorage.setItem('notesCollection', JSON.stringify(noteList))
            showNoteList()
        }else{
            noteList.push('<div class="note"><div class="note-text">' + noteText + '</div></div>')
            showNoteList()
        }
        notepadText.value = ''
        showConfigButtons(false)
        notes.lastElementChild.scrollIntoView()
    }
})

let noteID 

deleteBtn.addEventListener('click', () =>{
    const noteList = JSON.parse(localStorage.getItem('notesCollection'))
    
    const keys =  noteList.entries()

    for (let key of keys){
        if(notes.children[key[0]] == noteID){
            noteList.splice(key[0], 1)
            localStorage.setItem('notesCollection', JSON.stringify(noteList))
        }
    }

    notepadText.value = ''
    showNoteList()
    showConfigButtons(false)
})

editBtn.addEventListener('click', () =>{
    const noteList = JSON.parse(localStorage.getItem('notesCollection'))
    
    const keys =  noteList.entries()

    for (let key of keys){
        if(notes.children[key[0]] == noteID){
            noteList[key[0]] = '<div class="note"><div class="note-text">' + notepadText.value + '</div></div>'
            localStorage.setItem('notesCollection', JSON.stringify(noteList))
        }
    }

    notepadText.value = ''
    showNoteList()
    showConfigButtons(false)
})

const handleSelectedNote = () =>{
    notepadText.focus()
    document.querySelectorAll('.note').forEach(note =>{
        note.addEventListener('click', () =>{
            noteID = note
            
            isNoteSelected = true
            notepadText.value = note.firstElementChild.textContent
            showConfigButtons(true)
            notepadText.focus()
        })
    })
}

const showNoteList = () =>{
    if(JSON.parse(localStorage.getItem('notesCollection')) !== null) {
        notes.innerHTML = JSON.parse(localStorage.getItem('notesCollection')).join('')
    }else{
        localStorage.setItem('notesCollection', JSON.stringify(noteList))
        notes.innerHTML = JSON.parse(localStorage.getItem('notesCollection')).join('')
    }

    handleSelectedNote()
}

const showConfigButtons = (isNoteSelected) =>{
    if(isNoteSelected){
        editBtn.classList.add('change')
        deleteBtn.classList.add('change')
    }else{
        editBtn.classList.remove('change')
        deleteBtn.classList.remove('change')
    }
}

showNoteList()