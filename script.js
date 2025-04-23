const quoteBtn = document.getElementById("quoteBtn")
const modal = document.getElementById("modal")
const quoteText = document.getElementById("quoteText")
const quoteAuthor = document.getElementById("quoteAuthor")
const closeBtn = document.getElementById("closeBtn")
const saveBtn = document.getElementById("saveBtn")
const favoritesList = document.getElementById("favorites")

let currentQuote = null

quoteBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://recite-production.up.railway.app/api/v1/random")
    const data = await res.json()
    currentQuote = {
      text: data.quote,
      author: data.author + (data.book ? `, *${data.book}*` : "")
    }
    quoteText.textContent = `"${data.quote}"`
    quoteAuthor.textContent = `— ${data.author}${data.book ? `, ${data.book}` : ""}`
    modal.classList.remove("hidden")
  } catch (error) {
    quoteText.textContent = "Failed to load quote. Please try again."
    quoteAuthor.textContent = ""
    modal.classList.remove("hidden")
  }
})

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden")
})

saveBtn.addEventListener("click", () => {
  let saved = JSON.parse(localStorage.getItem("favorites")) || []
  const exists = saved.find(
    (q) => q.text === currentQuote.text && q.author === currentQuote.author
  )
  if (!exists) {
    saved.push(currentQuote)
    localStorage.setItem("favorites", JSON.stringify(saved))
    renderFavorites()
  }
  modal.classList.add("hidden")
})

function renderFavorites() {
  const saved = JSON.parse(localStorage.getItem("favorites")) || []
  favoritesList.innerHTML = ""
  saved.forEach((quote, index) => {
    const li = document.createElement("li")
    li.className = "bg-white p-4 rounded shadow flex justify-between items-center border border-gray-200"
    li.innerHTML = `
      <div>
        <p class="italic">"${quote.text}"</p>
        <p class="text-sm text-gray-600">— ${quote.author}</p>
      </div>
      <button class="text-red-500 hover:underline" data-index="${index}">Remove</button>
    `
    favoritesList.appendChild(li)
  })

  document.querySelectorAll("[data-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index")
      const updated = JSON.parse(localStorage.getItem("favorites"))
      updated.splice(idx, 1)
      localStorage.setItem("favorites", JSON.stringify(updated))
      renderFavorites()
    })
  })
}

document.addEventListener("DOMContentLoaded", renderFavorites)
