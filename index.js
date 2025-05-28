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
      const artList = document.getElementById("art-list");

      artworks.forEach(art => {
        const li = document.createElement("li");
        const title = document.createElement("h3");
        const artist = document.createElement("p");
        const img = document.createElement("img");

        title.innerText = art.title;
        artist.innerText = art.artist_title || "Unknown Artist";

        if (art.image_id) {
          img.src = `https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`;
          img.alt = art.title;
          img.className = "art-image";
          li.appendChild(img);
        }

        li.appendChild(title);
        li.appendChild(artist);
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
  const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=20&fields=title,artist_title,image_id`;

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

    title.innerText = art.title;
    artist.innerText = art.artist_title || "Unknown Artist";

    if (art.image_id) {
      img.src = `https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`;
      img.alt = art.title;
      img.className = "art-image";
      li.appendChild(img);
    }

    li.appendChild(title);
    li.appendChild(artist);
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