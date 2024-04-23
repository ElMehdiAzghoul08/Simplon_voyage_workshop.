// Initialize the slider functionality
const initSlider = () => {
    // Get necessary DOM elements for the slider
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle dragging of the scrollbar thumb
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            // Calculate scroll position based on thumb position
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            // Update thumb and image list scroll position
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};

// Initialize the slider on window resize and load
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

/* Handling the city button */

document.addEventListener("DOMContentLoaded", function() {
    const cityButton = document.getElementById("city-button");
    const cityList = document.getElementById("city-list");

    // Toggle the display of the city list when city button is clicked
    cityButton.addEventListener("click", function() {
        cityList.style.display = cityList.style.display === "none" ? "block" : "none";
    });

    // Fetch and populate the city list when the page loads
    fetch("cities.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                // Create list item for each city
                const li = document.createElement("li");
                li.textContent = city.name;
                li.addEventListener("click", function() {
                    // Set the selected city text as the button text and hide the list
                    cityButton.querySelector(".h3-city").textContent = city.name;
                    cityList.style.display = "none";
                });
                cityList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching cities:", error);
        });

    // Close the city list when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!cityButton.contains(event.target) && !cityList.contains(event.target)) {
            cityList.style.display = "none";
        }
    });
});

/* Handling the landscapes button */

document.addEventListener("DOMContentLoaded", function() {
    const landscapesButton = document.getElementById("landscapes-button");
    const landscapesList = document.getElementById("landscapes-list");

    // Toggle the display of the landscapes list when landscapes button is clicked
    landscapesButton.addEventListener("click", function() {
        landscapesList.style.display = landscapesList.style.display === "none" ? "block" : "none";
    });

    // Fetch and populate the landscapes list when the page loads
    fetch("landscapes.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(landscape => {
                // Create list item for each landscape
                const li = document.createElement("li");
                li.textContent = landscape.name;
                li.addEventListener("click", function() {
                    // Set the selected landscape text as the button text and hide the list
                    landscapesButton.querySelector(".h3-landscapes").textContent = landscape.name;
                    landscapesList.style.display = "none";
                });
                landscapesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching landscapes:", error);
        });

    // Close the landscapes list when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!landscapesButton.contains(event.target) && !landscapesList.contains(event.target)) {
            landscapesList.style.display = "none";
        }
    });
});