document.addEventListener("DOMContentLoaded", function () {
    let img = document.getElementById("galleryImage");
    let noteButton = document.querySelector(".note-btn");
    let note = document.querySelector(".hidden-note");
    let nextBtn = document.getElementById("nextBtn");
    let prevBtn = document.getElementById("prevBtn");
    let ourMemoriesBtn = document.getElementById("ourMemoriesBtn");
    let gallerySection = document.getElementById("gallerySection");

    let images = [
        { src: "images/image1.jpg", note: "Looking like a hottie! 🌸" },
        { src: "images/image2.jpg", note: "A memory I'll always cherish! ❤️" },
        { src: "images/image3.jpg", note: "Look at us, so happy! 😊" },
        { src: "images/image4.jpg", note: "Forever my favorite person! 💕" },
        { src: "images/image5.jpg", note: "Every moment with you is magic! ✨" }  // New 5th Image & Note
    ];
    let index = 0;

    // Adjust Image Size Based on Orientation
    function adjustImageSize() {
        if (img.naturalWidth > img.naturalHeight) {
            img.classList.remove("portrait");
            img.classList.add("landscape");
        } else {
            img.classList.remove("landscape");
            img.classList.add("portrait");
        }
    }

    // Change Image and Update Button Position
    function updateImage() {
        img.style.opacity = 0; // Fade out effect
        setTimeout(() => {
            img.src = images[index].src; // Change Image
            img.onload = function () {
                adjustImageSize();
                positionNoteButton(); // Reposition Button on New Image
                updateNoteContent(); // Update the note content
                img.style.opacity = 1; // Fade in effect
            };
        }, 300);

        // Reset "Click Me" button and note visibility
        note.classList.remove("show-note");
        noteButton.innerHTML = "Click Me ❤️";

        // Hide next/prev buttons when needed
        nextBtn.style.display = index === images.length - 1 ? "none" : "block";
        prevBtn.style.display = index === 0 ? "none" : "block";
    }

    function nextImage() {
        if (index < images.length - 1) {
            index++;
            updateImage();
        }
    }

    function prevImage() {
        if (index > 0) {
            index--;
            updateImage();
        }
    }

    // Toggle Note (Expands & Collapses)
    function toggleNote() {
        note.classList.toggle("show-note");

        if (note.classList.contains("show-note")) {
            noteButton.innerHTML = "❤️"; // Show only heart
        } else {
            noteButton.innerHTML = "Click Me ❤️"; // Restore full text
        }

        updateNotePosition(); // Adjust position dynamically
    }

    // Update Note Content for Each Image
    function updateNoteContent() {
        note.innerHTML = images[index].note;
    }

    // Position the Button on Random Image Edges
    function positionNoteButton() {
        let imgRect = img.getBoundingClientRect();
        let edgePadding = 20; // Keep button on edges

        // Possible edge positions
        let edgePositions = [
            { top: edgePadding, left: "50%" },   // Top-center
            { bottom: edgePadding, left: "50%" }, // Bottom-center
            { top: "50%", left: edgePadding },   // Left-center
            { top: "50%", right: edgePadding },  // Right-center
            { top: edgePadding, left: edgePadding },  // Top-left corner
            { top: edgePadding, right: edgePadding }, // Top-right corner
            { bottom: edgePadding, left: edgePadding }, // Bottom-left corner
            { bottom: edgePadding, right: edgePadding } // Bottom-right corner
        ];

        let randomPosition = edgePositions[Math.floor(Math.random() * edgePositions.length)];

        noteButton.style.position = "absolute";
        noteButton.style.top = randomPosition.top || "auto";
        noteButton.style.bottom = randomPosition.bottom || "auto";
        noteButton.style.left = randomPosition.left || "auto";
        noteButton.style.right = randomPosition.right || "auto";

        updateNotePosition(); // Adjust note position
    }

    // Make the Note Appear Closer to the Button
    function updateNotePosition() {
        let buttonRect = noteButton.getBoundingClientRect();
        note.style.position = "absolute";
        note.style.top = `${buttonRect.bottom + 5}px`; // Slightly below the button
        note.style.left = `${buttonRect.left}px`; // Align with button
    }

    // Smooth Transition when Clicking "Our Memories"
    if (ourMemoriesBtn) {
        ourMemoriesBtn.addEventListener("click", function (event) {
            event.preventDefault();
    
            // Add a nice fade + blur effect before switching
            gallerySection.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out, filter 0.8s ease-in-out";
            gallerySection.style.opacity = 0;
            gallerySection.style.transform = "translateY(-30px)";
            gallerySection.style.filter = "blur(5px)"; // Add blur effect
    
            setTimeout(() => {
                window.location.href = this.href;
            }, 800);
        });
    }

    // Load First Image Correctly
    function initializeGallery() {
        img.src = images[index].src;
        img.onload = function () {
            adjustImageSize();
            positionNoteButton();
            updateNoteContent();
        };
    }

    // Initialize gallery
    initializeGallery();

    // Assign Functions to Buttons
    window.nextImage = nextImage;
    window.prevImage = prevImage;
    window.toggleNote = toggleNote;
});
