function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.images = [...element.querySelectorAll(".img")];
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalTitle = getElement(".image-name");
  this.modalImages = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");

  // BIND FUNCTION TO GALLERY
  this.openModal = this.openModal.bind(this);
  // BIND EVENT LISTENERS TO GALLERY
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);

  this.container.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.images);
      }
      // console.log(this.images);
    }.bind(this)
  );
  // CLOSE MODAL IF USER CLICKS ANYWHERE BUT THE IMAGE
  this.modal.addEventListener(
    "click",
    function (e) {
      if (
        !e.target.classList.contains("modal-img") &&
        !e.target.classList.contains("main-img") &&
        !e.target.classList.contains("image-name") &&
        !e.target.parentElement.classList.contains("prev-btn") &&
        !e.target.parentElement.classList.contains("next-btn")
      ) {
        this.modal.classList.remove("open");
        this.closeBtn.removeEventListener("click", this.closeModal);
        this.nextBtn.removeEventListener("click", this.nextImage);
        this.prevBtn.removeEventListener("click", this.prevImage);
        this.modalImages.removeEventListener("click", this.chooseImage);
      }
      // console.log(e.target.parentElement);

      // console.log(this.images);
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  // console.log(list);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" class='${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}'>`;
    })
    .join("");
  this.modal.classList.add("open");

  // ADD EVENT LISTENERS TO BUTTONS
  this.closeBtn.addEventListener("click", this.closeModal);
  this.nextBtn.addEventListener("click", this.nextImage);
  this.prevBtn.addEventListener("click", this.prevImage);

  // ADD EVENT LISTENER TO IMAGES
  this.modalImages.addEventListener("click", this.chooseImage);
};

Gallery.prototype.setMainImage = function (selected) {
  this.modalImg.src = selected.src;
  this.modalTitle.textContent = selected.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);
  this.nextBtn.removeEventListener("click", this.nextImage);
  this.prevBtn.removeEventListener("click", this.prevImage);
  this.modalImages.removeEventListener("click", this.chooseImage);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  next = selected.nextElementSibling || this.modalImages.firstElementChild;

  selected.classList.remove("selected");
  next.classList.add("selected");
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  prev = selected.previousElementSibling || this.modalImages.lastElementChild;

  selected.classList.remove("selected");
  prev.classList.add("selected");
  this.setMainImage(prev);
};

Gallery.prototype.chooseImage = function (e) {
  // e.target.classList.contains("modal-img");
  if (e.target.classList.contains("modal-img")) {
    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected");

    this.setMainImage(e.target);
    e.target.classList.add("selected");
  }
};

// Gallery.prototype.offModal = function(e){
// if (e.target.classList.contains("img")) {
//         this.openModal(e.target, this.images);
//       }
//       // console.log(this.images);
//     }.bind(this)
// }

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
