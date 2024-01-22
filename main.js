document.addEventListener("DOMContentLoaded", function () {
  const rejectButton = document.getElementById("flexRadioDefault1");
  const approveButton = document.getElementById("flexRadioDefault2");
  const invalidFeedback = document.querySelector(".invalid-feedback");
  const dropdown = document.querySelector(".dropdown");
  const checkboxElements = document.querySelectorAll(".form-check-input");
  const saveButton = document.getElementById("saveButton");
  const cancelButton = document.querySelector(".save-cancel .btn-secondary");
  const selectedChoicesContainer = document.querySelector(".selected-choices");

  rejectButton.addEventListener("click", function () {
    invalidFeedback.style.display = "block";
    rejectButton.classList.add("checked");
    approveButton.classList.remove("checked");
    dropdown.querySelector(".dropdown-toggle").disabled = false; // Enable the dropdown button
    dropdown.classList.add("invalid-feedback-active");
    updateSaveButtonState();
  });

  approveButton.addEventListener("click", function () {
    invalidFeedback.style.display = "none";
    rejectButton.classList.remove("checked");
    approveButton.classList.add("checked");
    dropdown.querySelector(".dropdown-toggle").disabled = true; // Disable the dropdown button
    dropdown.classList.remove("invalid-feedback-active");
    selectedChoicesContainer.innerHTML = "";
    updateSaveButtonState();
  });

  checkboxElements.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateSelectedChoices);
  });

  rejectButton.addEventListener("change", updateSaveButtonState);
  approveButton.addEventListener("change", updateSaveButtonState);

  saveButton.addEventListener("click", function () {
    enableDropdown();
  });

  cancelButton.addEventListener("click", function () {
    // Reset the form state
    invalidFeedback.style.display = "none";
    rejectButton.classList.remove("checked");
    approveButton.classList.remove("checked");
    dropdown.querySelector(".dropdown-toggle").disabled = false; // Enable the dropdown button
    dropdown.classList.remove("invalid-feedback-active");
    clearSelectedChoices();
    updateSaveButtonState();
  });

  function updateSelectedChoices() {
    const selectedChoices = Array.from(checkboxElements)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    displaySelectedChoices(selectedChoices);
    updateSaveButtonState();
  }

  function displaySelectedChoices(choices) {
    selectedChoicesContainer.innerHTML = "";
    if (choices.length > 0) {
      const choicesList = document.createElement("ul");
      choices.forEach(function (choice) {
        const listItem = document.createElement("li");
        listItem.textContent = choice;
        choicesList.appendChild(listItem);
      });
      selectedChoicesContainer.appendChild(choicesList);
    }
  }

  function updateSaveButtonState() {
    saveButton.disabled = rejectButton.checked && !hasSelectedChoices();
    if (!rejectButton.checked) {
      // If "REJECT" button is unchecked, enable the save button
      saveButton.disabled = false;
    }
  }

  function hasSelectedChoices() {
    return Array.from(checkboxElements).some((checkbox) => checkbox.checked);
  }

  function enableDropdown() {
    if (!approveButton.classList.contains("checked")) {
      dropdown.querySelector(".dropdown-toggle").disabled = false; // Enable the dropdown button if not approved
    }
  }

  function clearSelectedChoices() {
    checkboxElements.forEach((checkbox) => (checkbox.checked = false));
    selectedChoicesContainer.innerHTML = "";
  }
});
