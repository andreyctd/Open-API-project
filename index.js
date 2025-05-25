fetch(`https://api.artic.edu/api/v1/artworks`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed`);
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        artworks = data.data;
        console.log("Artworks:", artworks);
    })
    .catch (error => {
        console.error(`An error occurred:`, error);
    });
