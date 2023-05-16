





const myModal = document.getElementById("myModal");

const btn = document.getElementById("openModal");


const span = document.getElementsByClassName("close")[0];


    






span.addEventListener("click", function() {
    myModal.style.display = "none";
})


window.onclick = function(event) {
if (event.target == myModal) {
    myModal.style.display = "none";
}
}

let figures = [];

const gallery = document.getElementById("gallery");

fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
    figures = data;
    createFigure(figures);
})
.catch(error => console.log(error));


async function refreshWorks(){
    const answer = fetch("http://localhost:5678/api/works")
    figures = answer.json();
    const figuresJSON = JSON.stringify(figures);
    window.sessionStorage.setItem("figures", figuresJSON);
};


function createFigure(figures) {
    galleryModal.innerHTML = '';

    for (let i=0;i<figures.length;i++) {
        const figure = figures[i];
        
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figcaptionElement = document.createElement('figcaption');
        
        const deleteWorkButton = document.createElement("a");
        const imgDeleteButton = document.createElement("img");
        imgDeleteButton.src = "assets/icons/trash-icon.png";
        imgDeleteButton.id = 'trashIcon';

        deleteWorkButton.appendChild(imgDeleteButton);
        figureElement.appendChild(deleteWorkButton);
        deleteWorkButton.appendChild(imgDeleteButton);

        imgElement.src = figure.imageUrl;        
        figcaptionElement.innerHTML = "éditer";
        
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        galleryModal.appendChild(figureElement);



        imgDeleteButton.addEventListener("click", async function() {
            const token = localStorage.getItem('token');
            console.log(token);
            fetch(`http://localhost:5678/api/works/${figures[i].id}`, {
                method: "DELETE",
                headers: {
                    "accept": "application/json",
                    'Authorization': 'Bearer ' + token,

                }
            }) 
            .then(response => {
                if (response.ok) {
                    
                    document.getElementById('galleryModal').innerHTML = "";
                    const index = figures.findIndex(figure => figure.id = figures[i].id);
                    figures.splice(index,1);
                    createFigure(figures);
                
                }
            
            });   
        
        });
    };

    
};


function createFigureModal(figures) {
    galleryModal.innerHTML = '';
};
    

        
        
        
        




        
    

const addPhotoButton = document.getElementById("addPhotoButton");


const deleteGalleryLink = document.getElementById("deleteGalleryLink");

const addPhotoModal = document.getElementById("addPhotoModal");


addPhotoButton.addEventListener("click", function() {
    addPhotoModal.style.display = "block";
    myModal.style.display = "none";
    
    
    
    span.addEventListener("click", function() {
        addPhotoModal.style.display = "none";
    })
    

    window.onclick = function(event) {
    if (event.target == addPhotoModal) {
        addPhotoModal.style.display = "none";
    }
    }
});




const select = document.getElementById("imageCategory");

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      select.appendChild(option);
    });
});



const valider = document.querySelector("#submitPhotoButton");
const title = document.querySelector("[name=imageTitle]").value;
const category = document.querySelector("[name=imageCategory]").value;


function validerButton(image) {
    if (!!image && !!title.value && !!category.value){
        
        valider.disabled = false;
        valider.style.backgroundColor = "#85acc1";
    }

};

export function addNewProjet() {
    let image;
    

    
    valider.disabled = true ;
    valider.style.backgroundColor = "grey";

    document.getElementById("imageFile").addEventListener("change", (event) => {
      let target = event.target;
      image = target.files[0];
      console.log(image);
        
      

    });

    

    const formNewProjet = document.getElementById("formAddPhoto");
    formNewProjet.addEventListener("submit", function (event) {
        event.preventDefault();
  

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("category", category);
        console.log(title);
        console.log(image);
        console.log(category);
        
        

        const token = localStorage.getItem('token');
        return fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "accept": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: formData
        });

        
    });


    const input = document.getElementById('imageFile');


    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const label = document.querySelector("label");
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.width = 100;
            img.height = 100;
            label.innerHTML = '';
            label.appendChild(img);
        };
        reader.readAsDataURL(file);
        
    });

    
}
  