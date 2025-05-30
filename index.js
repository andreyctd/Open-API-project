fetch(`https://api.artic.edu/api/v1/artworks`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
      console.log("Artworks:", data);
      const artworks = data.data;
      renderArtworks(artworks);
      const artList = document.getElementById("art-list");

      artworks.forEach(art => {
        const li = document.createElement("li");
        const title = document.createElement("h3");
        const artist = document.createElement("p");
        const img = document.createElement("img");
        const description = document.createElement("p");

        title.innerText = art.title;
        artist.innerText = art.artist_title || "Unknown Artist";

        if (art.image_id) {
          img.src = `https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`;
          img.alt = art.title;
          img.className = "art-image";
          li.appendChild(img);
        }
          
              description.className = "art-description";
              if (art.thumbnail?.alt_text) {
                description.innerText = art.thumbnail.alt_text;
              } else if (art.artist_display) {
                description.innerText = art.artist_display;
              } else {
                description.innerText = "No description available.";
              }

        li.appendChild(title);
        li.appendChild(artist);
        li.appendChild(description);
        artList.appendChild(li);
      });
  })
  .catch((error) => {
    console.error(`An error occurred:`, error);
  }); // old code

const form = document.getElementById("search-form");
const select = document.getElementById("artist-select");
const artList = document.getElementById("art-list");

// Fetch artworks filtered by selected artist name
function fetchArtworksByArtist(artistName) {
  const query = encodeURIComponent(artistName);
 /* const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=20&fields=title,artist_title,image_id`; */
  const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=20&fields=title,artist_title,image_id,thumbnail,artist_display`;
    
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Request failed");
      return response.json();
    })
    .then((data) => {
      const artworks = data.data;
      renderArtworks(artworks);
    })
    .catch((err) => {
      console.error("Error:", err);
      artList.innerHTML = "<li>Could not load artworks. Try again.</li>";
    });
}

// Render artworks in the DOM
function renderArtworks(artworks) {
  artList.innerHTML = "";

  if (artworks.length === 0) {
    artList.innerHTML = "<li>No artworks found for this artist.</li>";
    return;
  }

  artworks.forEach((art) => {
    const li = document.createElement("li");
    const title = document.createElement("h3");
    const artist = document.createElement("p");
    const img = document.createElement("img");
    const description = document.createElement("p");

    title.innerText = art.title;
    artist.innerText = art.artist_title || "Unknown Artist";

    if (art.image_id) {
      img.src = `https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`;
      img.alt = art.title;
      img.className = "art-image";
      li.appendChild(img);
    }

    // Add description
    description.className = "art-description";
    if (art.thumbnail?.alt_text) {
      description.innerText = art.thumbnail.alt_text;
    } else if (art.artist_display) {
      description.innerText = art.artist_display;
    } else {
      description.innerText = "No description available.";
    }
    // Append elements to the list item
    li.appendChild(title);
    li.appendChild(artist);
    li.appendChild(description);
    artList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedArtist = select.value;
  if (selectedArtist) {
    fetchArtworksByArtist(selectedArtist);
  } else {
    artList.innerHTML = "<li>Please select an artist first.</li>";
  }
}); 
// Create and append the footer
 const footer = document.createElement("footer");
footer.id = "main-footer";
 const footerContent = document.createElement("div");
footerContent.className = "footer-content";
 const text = document.createElement("p");
 text.innerHTML = "&copy; 2025 Art Explorer. All rights reserved.";
/* footer.innerHTML = `<p>&copy; 2025 Art Explorer. All rights reserved.</p>`; */
 // Create image element
const img = document.createElement("img");
img.src = "images/unnamed.png";
img.alt = "Logo";
img.className = "footer-logo";
img.style.width = "40px";
img.style.height = "40px";
// Append image and text to the container
footerContent.appendChild(img);
footerContent.appendChild(text);

// Append container to the footer
footer.appendChild(footerContent);

// Append footer to the body
document.body.appendChild(footer);
/* footer.appendChild(img);
// Append the footer to the body
 document.body.appendChild(footer); */