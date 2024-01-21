document.addEventListener("DOMContentLoaded", function () {
  // Update styles and required status based on the initial checked state
  updateStyles();
  updateRequiredStatus();

  // Add event listener for changes in the checked state
  document
    .querySelectorAll('.button-div input[type="radio"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        updateStyles();
        updateRequiredStatus();
        updateInvalidFeedbackVisibility();
      });
    });
});

function updateStyles() {
  document
    .querySelectorAll('.button-div input[type="radio"]')
    .forEach(function (radio) {
      const label = document.querySelector('label[for="' + radio.id + '"]');
      label.classList.toggle("checked", radio.checked);
    });
}

function updateRequiredStatus() {
  const rejectRadio = document.getElementById("flexRadioDefault1");
  const textarea = document.getElementById("floatingTextarea");
  textarea.required = rejectRadio.checked;
}

function updateInvalidFeedbackVisibility() {
  const rejectRadio1 = document.getElementById("flexRadioDefault1");
  const invalidFeedback = document.querySelector(".invalid-feedback");

  if (rejectRadio1.checked) {
    invalidFeedback.style.display = "block";
  } else {
    invalidFeedback.style.display = "none";
  }
}
