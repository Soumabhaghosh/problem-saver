

document.addEventListener("click",function(e) {

    if(e.target.classList.contains("delete-me")){

        if(confirm("are you want to delte this")){
          axios.post('/delete-item',{id: e.target.getAttribute('data-id')}).then(function () {
            e.target.parentElement.parentElement.remove()
          }).catch(function () {
            console.log("try again");
          })
        }


    }



    if(e.target.classList.contains("edit-me")){
      
      const str =  prompt("you can enter new text",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML )
      const str2=prompt("enter new link here",document.getElementById("myAnchor").href)
      if(str){
        axios.post('/update-item', {text : str, link: str2, id: e.target.getAttribute('data-id') }).then(function () {
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = str
            
        }).catch(function() {
            console.log("try again");
        })
      }
      // if(str2){
      //   document.getElementById("myAnchor").href = str2
      // }
    
    }
    
})