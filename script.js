fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.innerHTML = `
        <h2>${card.name}</h2>
        <p>${card.description}</p>
        <div class="tags">
          ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      `;
      document.body.appendChild(cardElement);
    });
  });

const searchInput = document.getElementById('search');

function searchCards() {
    // Get the search query and convert it to lowercase
    const searchQuery = searchInput.value.toLowerCase();
  
    // Select all the card elements
    const cards = document.querySelectorAll('.card');
  
    // Iterate through the card elements
    cards.forEach(card => {
      // Get the card's tags, name, and description
      const cardTags = card.querySelectorAll('.tag');
      const cardName = card.querySelector('h2').innerHTML.toLowerCase();
      const cardDescription = card.querySelector('p').innerHTML.toLowerCase();
      let match = false;
  
      // Check if any of the card's tags or the card's name or description contain the search query
      cardTags.forEach(tag => {
        if (tag.innerHTML.toLowerCase().includes(searchQuery)) {
          match = true;
        }
      });
      if (cardName.includes(searchQuery) || cardDescription.includes(searchQuery)) {
        match = true;
      }
  
      // If the card matches the search query, display it; otherwise, hide it
      if (match) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Set up an event listener on the search input field that calls the searchCards() function when the input is changed
  searchInput.addEventListener('input', searchCards);
  