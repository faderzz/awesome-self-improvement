// Fetch data from the data.json file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Get the search input and results container elements
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    // Add an event listener to the search input to trigger the search when the user submits the form
    searchInput.addEventListener('keyup', event => {
      // Get the search query from the input field
      const query = event.target.value.toLowerCase();

      // Filter the data object to find any cards that match the query
      const matchingCards = data.filter(card => {
        // Check if the name of the card, description, or any of the tags match the query
        return (
          card.name.toLowerCase().includes(query) ||
          card.description.toLowerCase().includes(query) ||
          card.tags.some(tag => tag.toLowerCase().includes(query))
        );
      });

      // Clear the results container
      resultsContainer.innerHTML = '';

      // If there are no matching cards, display a message
      if (matchingCards.length === 0) {
        resultsContainer.innerHTML = '<p>No matching cards found</p>';
      } else {
        // Otherwise, display the matching cards
        for (const card of matchingCards) {
          // Create the HTML for the card
          const cardHTML = `
            <div class="card">
              <h2>${card.name}</h2>
              <p>${card.description}</p>
              <div class="tags">
                ${card.tags.map(tag => `<span>${tag}</span>`).join('')}
              </div>
            </div>
          `;

          // Append the card HTML to the results container
          resultsContainer.innerHTML += cardHTML;
        }
      }
    });
  });
