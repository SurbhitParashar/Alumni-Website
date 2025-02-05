// toggle to the button
        function toggleProfiles(buttonNumber) {
            // Hide all profile containers
            document.querySelectorAll('.profile-container').forEach(container => {
                 container.style.display = 'none';
            });

            // Show the selected profile container
            const selectedProfiles = document.getElementById(`profiles-${buttonNumber}`);
            if (selectedProfiles) {
                selectedProfiles.style.display = 'flex';
            }
            else{
                box.style.display = 'none';
            }
        }
