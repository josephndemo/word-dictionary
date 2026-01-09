const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", searchWord);

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
    resultDiv.innerHTML = `<p>❌ No results found for "<strong>${word}</strong>"</p>`;
  }
}

function displayResults(data) {
  resultDiv.innerHTML = "";

  data.forEach(entry => {
    entry.meanings.forEach(meaning => {
      const meaningDiv = document.createElement("div");
      meaningDiv.classList.add("meaning");

      meaningDiv.innerHTML = `
        <p class="part-of-speech">${meaning.partOfSpeech}</p>
        ${meaning.definitions.map(def => `
          <p class="definition">• ${def.definition}</p>
          ${def.example ? `<p class="example">Example: "${def.example}"</p>` : ""}
        `).join("")}
      `;

      resultDiv.appendChild(meaningDiv);
    });
  });
}
