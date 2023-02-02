showNotes() // calling function to save notes when loading
let addButton = document.getElementById("addBtn");
addButton.addEventListener("click", function (e) {
    let TextArea = document.getElementById("floatingTextarea");
    showNotes() 
    let notes= localStorage.getItem("notes");
    
    if (notes == null){
        notesObj = [] // where we'll store notes
    } else{
        notesObj = JSON.parse(notes); // take notes string and convert into object which can be stored in array.
    }
    //add content to textarea
    notesObj.push(TextArea.value);

    //add content to localstorage
    localStorage.setItem("notes", JSON.stringify(notesObj)); // converting object to string to store in array.

// to clear comment after added
    TextArea.value = "";

    
});

//showing notes in textarea
function showNotes(){
    let notes= localStorage.getItem("notes");

    if (notes == null){
        notesObj = [] 
    } else{
        notesObj = JSON.parse(notes); 
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `<div class="card mx-2 my-2 noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Notes ${index+1}</h5>
          <p class="cardText">${element}</p>
          <button id ="${index}"class="btn btn-primary" onclick="deletebtn(this.id)">Delete Note</button>
        </div>
      </div>` 
      //generate the boxes
      let notesElm = document.getElementById("notes")
      if (notesObj.length !=0){
        notesElm.innerHTML = html;
      }
    });
}

// the way to differentiate buttons is by id by using index.
// this id means it will send the elements ID on which its clicked
function deletebtn(index) {
    let notes= localStorage.getItem("notes");
    if (notes == null){
        notesObj = [] 
    } else{
        notesObj = JSON.parse(notes); 
    }

notesObj.splice(index, 1)
// to update storage 
localStorage.setItem("notes", JSON.stringify(notesObj))
showNotes()
}

// creating the search feature
let search = document.getElementById("searchTxt")
search.addEventListener("input", function(){
    let inputVal = search.value

    let noteCard = document.getElementsByClassName("noteCard")
    Array.from(noteCard).forEach(function(element){
        let cardText = document.getElementsByTagName("p")[0].innerText
        if(cardText.includes(inputVal)){
            element.style.display = "block"
        }else {
            element.style.display = "none"
        }
    })

})