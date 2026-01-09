// Get references to HTML elements
const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");

// Add click event listener to the search button
searchBtn.addEventListener("click", searchWord);

// Async function to search for a word using the Dictionary API
async function searchWord() {

  // Get the input value and remove extra spaces
  const word = wordInput.value.trim();

  // Check if input is empty
  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  // API endpoint with the searched word
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    // Fetch data from the API
    const response = await fetch(apiURL);

    // Handle case where the word is not found
    if (!response.ok) {
      throw new Error("Word not found");
    }

    // Convert response to JSON
    const data = await response.json();

    // Display the results on the page
    displayResults(data);

  } catch (error) {
    // Display error message if API request fails
    resultDiv.innerHTML = `<p>!! No results found for "<strong>${word}</strong>"</p>`;
  }
}

// Function to display dictionary results
function displayResults(data) {

  // Clear previous results
  resultDiv.innerHTML = "";

  // Loop through each dictionary entry
  data.forEach(entry => {

    // Loop through each meaning of the word
    entry.meanings.forEach(meaning => {

      // Create a container for each meaning
      const meaningDiv = document.createElement("div");
      meaningDiv.classList.add("meaning");

      // Build HTML for part of speech, definitions, and examples
      meaningDiv.innerHTML = `
        <p class="part-of-speech">${meaning.partOfSpeech}</p>
        ${meaning.definitions.map(def => `
          <p class="definition">• ${def.definition}</p>
          ${def.example ? `<p class="example">Example: "${def.example}"</p>` : ""}
        `).join("")}
      `;

      // Add the meaning to the results section
      resultDiv.appendChild(meaningDiv);
    });
  });
}