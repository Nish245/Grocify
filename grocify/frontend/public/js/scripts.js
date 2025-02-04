// Main Function used across all pages.

// Initialize Mobile Sidenav
    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    });

// Initialize Modals
    document.addEventListener('DOMContentLoaded', function () {
        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
    });


// Search Functionality
    document.getElementById('search-btn').addEventListener('click', function () {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
        console.log(`Search for: ${query}`); // Replace with actual search logic
        alert(`You searched for: "${query}"`);
        } else {
        alert('Please enter a search term.');
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust offset if needed
                        behavior: "smooth"
                    });
                }
            });
        });
    });