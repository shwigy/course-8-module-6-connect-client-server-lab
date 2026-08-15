const API_URL = "http://localhost:5000";

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}

function loadEvents() {
  fetch(`${API_URL}/events`)
    .then((response) => response.json())
    .then((events) => {
      document.querySelector("#event-list").innerHTML = "";
      events.forEach(renderEvent);
    })
    .catch((error) => console.error("Error loading events:", error));
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const title = titleInput.value.trim();

  if (!title) {
    alert("Please enter a title for the event.");
    return;
  }

  fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || "Failed to add event");
        });
      }
      return response.json();
    })
    .then((event) => {
      renderEvent(event);
      titleInput.value = "";
    })
    .catch((error) => alert(error.message));
});

loadEvents();
