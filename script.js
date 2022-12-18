// Retrieve the data from the data.json file and generate the card elements
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

// Get the search input field
const searchInput = document.getElementById('search');

let timeout;

function searchCards() {
  // Clear the timeout if it exists
  if (timeout) {
    clearTimeout(timeout);
  }

  // Set a new timeout to debounce the search request
  timeout = setTimeout(() => {
    // Get the search query and convert it to lowercase
    const searchQuery = searchInput.value.toLowerCase();

    // Select all the card elements
    const cards = document.querySelectorAll('.card');

    // Iterate through the card elements
    cards.forEach(card => {
      // Get the card's tags
      const cardTags = card.querySelectorAll('.tag');

      // Check if the card has a name and a description element
      const cardNameElement = card.querySelector('h2');
      const cardDescriptionElement = card.querySelector('p');
      let match = false;

      // If the card has a name and a description element, get their contents
      if (cardNameElement && cardDescriptionElement) {
        const cardName = cardNameElement.innerHTML.toLowerCase();
        const cardDescription = cardDescriptionElement.innerHTML.toLowerCase();

        // Check if any of the card's tags or the card's name or description contain the search query
        cardTags.forEach(tag)
