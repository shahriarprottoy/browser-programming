// Helper: show/hide loading and error indicators
function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function showError() {
  document.getElementById("error").style.display = "block";
}

// Bonus: format date nicely
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

// Task 1 & 2 — Get message with extra fields + bonus time display
function getMessage() {
  showLoading();
  document.getElementById("message-card").style.display = "none";
  document.getElementById("student-card").style.display = "none";

  fetch("http://localhost:3000/api/message")
    .then(response => response.json())
    .then(data => {
      hideLoading();
      document.getElementById("output").innerText = data.message;
      document.getElementById("course").innerText = data.course;
      document.getElementById("year").innerText = data.year;
      // Bonus: formatted date
      document.getElementById("time").innerText = formatDate(data.time);
      document.getElementById("message-card").style.display = "block";
    })
    .catch(error => {
      hideLoading();
      showError();
      console.error("Error:", error);
    });
}

// Task 3 — Get student info
function getStudent() {
  showLoading();
  document.getElementById("message-card").style.display = "none";
  document.getElementById("student-card").style.display = "none";

  fetch("http://localhost:3000/api/student")
    .then(response => response.json())
    .then(data => {
      hideLoading();
      document.getElementById("student-name").innerText = data.name;
      document.getElementById("student-role").innerText = data.role;
      document.getElementById("student-card").style.display = "block";
    })
    .catch(error => {
      hideLoading();
      showError();
      console.error("Error:", error);
    });
}
