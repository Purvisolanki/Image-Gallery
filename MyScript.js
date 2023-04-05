const galleryContainer = document.getElementById("gallery-container");
const galleryItem = document.getElementById("gallery-item");
const loadingElement = document.getElementById("loadingElement");

async function fetchData() {
  try {
    galleryContainer.style.display = "none";

    const response = await fetch("https://picsum.photos/v2/list?limit=100");
    const data = await response.json();
    console.log(data);
    const images = data;

    const dataArray = [];
    images.forEach((item) => {
      dataArray.push(item);
    });

//     galleryContainer.style.display = "flex";
    loadingElement.style.display = "none";
    bindData(dataArray);
  } catch (error) {
    console.log(error);
  }
}

function bindData(dataArray) {
  dataArray.forEach((images) => {
    const galleryItemClone = galleryItem.cloneNode(true);
    const galleryImage = galleryItemClone.querySelector("#gallery-image");
    // galleryCard.classList.add("gallery-Card");
    galleryImage.src = images.download_url;

    galleryContainer.appendChild(galleryItemClone);

    // galleryImage.onclick = (event) => {
    //   console.log(event.target);
    //   document.querySelector(".popup-image").style.display = "block";
    //   document.querySelector(".popup-image img").src =
    //     event.target.getAttribute("src");
    // };

    // popup close button

    document.querySelector(".popup-image span").onclick = () => {
      document.querySelector(".popup-image").style.display = "none";
    };

    const popupImages = document.querySelectorAll(".flex-container   ");
    popupImages.forEach((image, index) => {
      image.addEventListener("click", () => {
        // Retrieve the index of the clicked image within the array
        const position = Array.from(popupImages).indexOf(image);

        // Display the appropriate image in the popup
        // displayPopupImage(position);
        console.log(position);
      });
    });

    // Popup slider
    galleryImage.onclick = function (event) {
      console.log(event.target);
      document.querySelector(".popup-image").style.display = "block";

      // console.log(dataArray);

      // slider code

      // const images = [
      //   "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      //   "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      //   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
      //   "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
      //   "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
      // ];

      const n = dataArray.length;
      const flexContainer = document.getElementById("flex-container");
      const leftButton = document.getElementById("left-btn");
      const rightButton = document.getElementById("right-btn");
      const carouselNav = document.getElementById("carousel-nav");

      const containerWidth = 56;
      const flexContainerWith = n * containerWidth;
      flexContainer.style.width = flexContainerWith;

      for (let i = 0; i < n; i++) {
        const newImage = document.createElement("img");
        newImage.src = dataArray[i].download_url;
        newImage.classList.add("img-style");

        flexContainer.appendChild(newImage);
      }

      document.querySelector(".flex-container img").src =
        event.target.getAttribute("src");

      // console.log(event.target);

      galleryImage.addEventListener("click", (event) => {
        const index = [...galleryContainer.children].indexOf(event.target);
        console.log("clickdddd", index);
      });

      // console.log("Clicked item", indexOfArray);

      // console.log("Array item", item);

      // console.log(clickedItem.parentNode.children);

      let currentPosition = 0;

      leftButton.addEventListener("click", () => {
        if (currentPosition > 0) {
          currentPosition--;
        } else {
          currentPosition = n - 1;
        }
        showImage();

        console.log("position is 0");
      });

      rightButton.addEventListener("click", () => {
        if (currentPosition < n - 1) {
          currentPosition++;
        } else {
          currentPosition = 0;
        }
        showImage();
      });

      function showImage() {
        const translateXDistance = -currentPosition * containerWidth;
        flexContainer.style.transform = `translateX(${translateXDistance}vw)`;
      }
    };
  });
  galleryItem.style.display = "none";
}

fetchData();

// document
//   .querySelectorAll(".gallery-container .gallery-image img")
//   .forEach((image) => {
//     console.log("reached");
//     image.onclick = () => {
//       console.log(clicked);
//       document.querySelector(".popup-image").style.display = "block";
//       document.querySelector(".popup-image img").src =
//         image.getAttribute("src");
//     };
//   });
