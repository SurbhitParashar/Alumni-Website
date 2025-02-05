function toggleSelection(element) {
    // Toggle the "selected" class for visual feedback
    element.classList.toggle("selected");

    // Update the hidden input with the selected interests
    const selected = Array.from(document.querySelectorAll(".box.selected"))
        .map((el) => el.textContent.trim()); // Collect text of selected boxes
    document.getElementById("selectedInterests").value = selected.join(","); // Set value as comma-separated string
}
