const notepadText = document.querySelector('.notepad-text')
const addBtn = document.querySelector('.add-btn')
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
    }
})

const showNoteList = () =>{
    if(JSON.parse(localStorage.getItem('notesCollection')) !== null) {
        notes.innerHTML = JSON.parse(localStorage.getItem('notesCollection')).join('')
    }else{
        localStorage.setItem('notesCollection', JSON.stringify(noteList))
        notes.innerHTML = JSON.parse(localStorage.getItem('notesCollection')).join('')
    }
}

showNoteList()