// Get references to HTML elements
const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");

// Add click event listener to the search button
searchBtn.addEventListener("click", searchWord);

// Async function to search for a word using the Dictionary API
async function searchWord() {
  const word = wordInput.value.trim();

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();

    displayResults(data);
  } catch (error) {
    resultDiv.innerHTML = `<p>!! No results found for "<strong>${word}</strong>"</p>`;
  }
}

// Function to display dictionary results
function displayResults(data) {
  resultDiv.innerHTML = "";

  // Loop through each dictionary entry
  data.forEach(entry => {

    // Add audio button if phonetics audio exists
    let audioHTML = "";
    if (entry.phonetics && entry.phonetics.length > 0) {
      const audioSrc = entry.phonetics.find(p => p.audio)?.audio;
      if (audioSrc) {
        audioHTML = `<button class="audio-btn" onclick="playAudio('${audioSrc}')">🔊</button>`;
      }
    }

    // Loop through each meaning of the word
    entry.meanings.forEach(meaning => {
      const meaningDiv = document.createElement("div");
      meaningDiv.classList.add("meaning");

      meaningDiv.innerHTML = `
        <p class="part-of-speech">${meaning.partOfSpeech} ${audioHTML}</p>
        ${meaning.definitions.map(def => `
          <p class="definition">• ${def.definition}</p>
          ${def.example ? `<p class="example">Example: "${def.example}"</p>` : ""}
        `).join("")}
      `;

      resultDiv.appendChild(meaningDiv);
    });
  });
}

// Function to play audio
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}