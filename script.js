// Fetch data from the data.json file
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Get the search input and results container elements
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    // Display all cards from the data object
    displayCards(data);

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

      // Display the matching cards
      displayCards(matchingCards);
    });
  });

// Function to display the cards in the results container
function displayCards(cards) {
  // Clear the results container
  document.getElementById('results').innerHTML = '';

  // If there are no cards, display a message
  if (cards.length === 0) {
    document.getElementById('results').innerHTML = '<p>No matching cards found</p>';
  } else {
    // Otherwise, display the cards
    for (const card of cards) {
      // Create the HTML for the card
      const cardHTML = `
        <div class="card">
          <h2>${card.name}</h2>
          <p>${card.description}</p>
          <br>
          <div class="tags">
            ${card.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <a href="${card.link}" target="_blank">View</a>
        </div>
      `;

      // Append the card HTML to the results container
      document.getElementById('results').innerHTML += cardHTML;
    }
  }
}


// sorting table
$('#results').each(function(i) {
  tw = 0;
  $(this).children('.cards').each(function() {
    tw += $(this).outerWidth(true);
  });
  $(this).attr('data-width', tw);
});

$(window).on('load resize', function() {
  w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  $('#results').each(function(i) {
    if ($(this).width() >= w) {
      $(this).addClass('wrap');
    } else if (w >= $(this).attr('data-width')) {
      $(this).removeClass('wrap');    
    }
  });
}).resize();