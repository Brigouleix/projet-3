
import { addNewProjet } from "./modal.js";


let categories = [];
let figures = [];

const gallery = document.querySelector(".gallery");
const category = document.querySelector(".category");


function loginLogout(){
  const loginLogoutLink = document.querySelector(".login-logout");
  const isConnected = !!localStorage.getItem('token');
  
  if (isConnected === true){
    loginLogoutLink.innerText = "logout";

    loginLogoutLink.addEventListener("click", function(event){
        event.preventDefault();
        window.sessionStorage.removeItem(isConnected);
        alert("vous allez être déconnecté.");
        window.location.replace("/index.html");
        localStorage.removeItem('token');
    });

    const edit = document.createElement("div");
    edit.className = "edition";
    const editionModeTopSectionIcon = document.createElement("img");
    editionModeTopSectionIcon.src = "assets/icons/edition-icon.png";
    const photoIntroIcon = document.createElement("p");
    photoIntroIcon.innerText = "modifier";
    edit.appendChild(editionModeTopSectionIcon);
    edit.appendChild(photoIntroIcon);
    
    const photoIntro = document.getElementById("profilPhoto");
    const photoIntroModify = photoIntro.querySelector("figure");


    photoIntro.prepend(edit);
    
    
    
    const titleIntro = document.querySelector("article");
    
    titleIntro.prepend(edit);
    
  
    
    //Creation du bouton pour modifier projets et ouvrir/fermer modale

    const portfolioSection = document.querySelector("#portfolio");
    const divTitleModify = document.createElement("div");
    divTitleModify.id = 'edit-container';
    portfolioSection.prepend(divTitleModify);

    const worksTitleH2 = document.querySelector("#portfolio h2");
    divTitleModify.appendChild(worksTitleH2);

    const linkModifyWorks = document.createElement("a");
    linkModifyWorks.id = "openModal";
    worksTitleH2.after(linkModifyWorks);

    const modifyIcon = document.createElement("img");
    modifyIcon.src = "assets/icons/edition-icon.png";
    modifyIcon.id = "editIcon";
    linkModifyWorks.appendChild(modifyIcon);

    const modifyP = document.createElement("p");
    modifyP.innerText = "modifier";
    linkModifyWorks.appendChild(modifyP);


    const myModal = document.getElementById("myModal");

    const btn = document.getElementById("openModal");

    const addPhotoModal = document.getElementById("addPhotoModal");

    const span = document.getElementsByClassName("close")[0];


    

    btn.addEventListener("click",  function() {
        myModal.style.display = "flex";
    });

    span.addEventListener("click", function() {
        myModal.style.display = "none";
    });


    window.onclick = function(event) {
      if (event.target == myModal) {
          myModal.style.display = "none";
      }
    };
  }
}
function verifyConnection() {
  const isConnected = !!localStorage.getItem('token');
  return isConnected; 
}
loginLogout()

addNewProjet()

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    figures = data;
    createFigure(figures);
  })
  .catch(error => console.log(error));



function createFigure(figures) {
    gallery.innerHTML = '';

    for (let i=0;i<figures.length;i++) {
        const figure = figures[i];
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figcaptionElement = document.createElement('figcaption');

        imgElement.src = figure.imageUrl;        
        figcaptionElement.innerHTML = figure.title;
        
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        gallery.appendChild(figureElement);
    }
  
}




fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {
  categories = data;
  createCategoryButtons(categories);
})
.catch(error => console.log(error));



function createCategoryButtons(categories) {
  const filtre = document.querySelector(".category"); 
  const modal = document.getElementById("openModal");
  
  
  if (verifyConnection() === false ) {

    

    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    
    allButton.addEventListener('click', () => {
      createFigure(figures);
    });
    filtre.appendChild(allButton);

    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.addEventListener('click', () => {
        const filteredFigures = figures.filter(figure => figure.categoryId === category.id);
        createFigure(filteredFigures);
      });
      filtre.appendChild(button);
    });
    filtre.style.display = "flex";
    modal.style.display = "none";

    


  }
  
  else {
    modal.style.display = "flex";
    filtre.style.display = "none";  
  }
}





