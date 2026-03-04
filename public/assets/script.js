// Add event listeners only if elements exist
document.addEventListener("DOMContentLoaded", function() {
    // Initialize page loading progress bar
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        // Simulate page loading progress
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 10;
                progressBar.style.width = width + "%";
                if (width >= 100) {
                    setTimeout(() => {
                        progressBar.style.opacity = "0";
                    }, 200);
                }
            }
        }, 100);
    }
    
    // Add fade-in animations to elements
    const addFadeInEffects = () => {
        const elements = [
            document.querySelector(".timing-base-greeting"),
            document.querySelector(".form-group:nth-of-type(1)"),
            document.querySelector(".form-group:nth-of-type(2)"),
            document.querySelector(".form-check"),
            document.querySelector(".submitsignbtn")
        ];
        
        elements.forEach((element, index) => {
            if (element) {
                element.classList.add("fade-in");
                element.classList.add(`delay-${(index + 1) * 100}`);
            }
        });
    };
    
    addFadeInEffects();
    
    // Login form submission handler
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop form submission
            
            const email = document.getElementById("exampleInputEmail1").value.trim();
            const password = document.getElementById("exampleInputPassword1").value.trim();

            if (!email || !password) {
                alert("Both username and password are required.");
                return;
            }
            
            // Add pulse animation to login button
            const loginButton = document.querySelector(".logon-btn");
            if (loginButton) {
                loginButton.classList.add("pulse");
            }
            
            // Show loading spinner for a brief moment
            const loadingSpinner = document.getElementById("loadingSpinner");
            if (loadingSpinner) {
                loadingSpinner.classList.add("active");
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    loadingSpinner.classList.remove("active");
                    
                    // Open modal after "loading" completes
                    const modal = document.getElementById('exampleModal');
                    if (modal && typeof bootstrap !== 'undefined') {
                        const bsModal = new bootstrap.Modal(modal);
                        bsModal.show();
                    } else {
                        // Fallback if Bootstrap is not available
                        window.location.href = "profile.html";
                    }
                    
                    // Remove pulse animation
                    if (loginButton) {
                        loginButton.classList.remove("pulse");
                    }
                }, 1000);
            }
        });
    }

    // Add subtle hover interactions to navigation items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add hover effect to account options
    const accountOptions = document.querySelectorAll('.acont-drop');
    accountOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.color = '#d71e28';
            this.style.cursor = 'pointer';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.color = '';
        });
    });
    
    // Function to determine the greeting
    function getGreetingBasedOnTime() {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon";
        } else if (hour >= 17 && hour < 21) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    }

    // Set the greeting on page load
    const greetingText = document.getElementById("greetingText");
    if (greetingText) {
        greetingText.textContent = getGreetingBasedOnTime();
    }

    // Show login time
    const loginTime = sessionStorage.getItem("loginTime") || "Not available";
    const userIp = sessionStorage.getItem("userIp") || "Not available";

    const detailsDiv = document.querySelector(".clnt-details");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
        <strong>Login time:</strong> ${loginTime}<br>
        <strong>Your IP Address:</strong> ${userIp}
        `;
        
        // Add fade-in animations to account cards
        const accountCards = document.querySelectorAll('.aconct-card-bg-white');
        accountCards.forEach((card, index) => {
            // Add shimmer effect initially
            card.classList.add('shimmer');
            
            // After a short delay, remove shimmer and add fade-in
            setTimeout(() => {
                card.classList.remove('shimmer');
                card.classList.add('fade-in');
                card.classList.add(`delay-${(index + 1) * 100}`);
            }, 1000);
        });
        
        // Hide the loading spinner if it's showing
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner && loadingSpinner.classList.contains('active')) {
            setTimeout(() => {
                loadingSpinner.classList.remove('active');
            }, 500);
        }
        
        // Initialize and then hide progress bar
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.style.width = "100%";
            setTimeout(() => {
                progressBar.style.opacity = "0";
            }, 500);
        }
    }

    // Attach this to modal Proceed button on login page
    const proceedButton = document.querySelector(".proceeed-butoon");
    if (proceedButton) {
        proceedButton.addEventListener("click", () => {
            const checkbox = document.getElementById("modalAcceptCheck");
            const warning = document.getElementById("acceptWarning");

            if (!checkbox.checked) {
                warning.style.display = "block";
                return; // Stop here if checkbox is not checked
            } else {
                warning.style.display = "none";
            }
            
            // Add loading animation when proceeding
            const loadingSpinner = document.getElementById("loadingSpinner");
            if (loadingSpinner) {
                loadingSpinner.classList.add("active");
            }
            
            // Update progress bar
            const progressBar = document.getElementById("progressBar");
            if (progressBar) {
                progressBar.style.opacity = "1";
                progressBar.style.width = "0%";
                
                let width = 0;
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                    } else {
                        width += 5;
                        progressBar.style.width = width + "%";
                    }
                }, 50);
            }

            const loginTime = new Date().toLocaleString();
            sessionStorage.setItem("loginTime", loginTime);

            fetch("https://api.ipify.org?format=json")
                .then(res => res.json())
                .then(data => {
                    sessionStorage.setItem("userIp", data.ip);
                    
                    // Simulate a slight delay before navigation
                    setTimeout(() => {
                        if (loadingSpinner) {
                            loadingSpinner.classList.remove("active");
                        }
                        window.location.href = "profile.html";
                    }, 1500); // 1.5 second delay for better user experience
                })
                .catch(() => {
                    sessionStorage.setItem("userIp", "Unable to fetch IP");
                    
                    // Simulate a slight delay before navigation
                    setTimeout(() => {
                        if (loadingSpinner) {
                            loadingSpinner.classList.remove("active");
                        }
                        window.location.href = "profile.html";
                    }, 1500); // 1.5 second delay for better user experience
                });
        });
    }

    // Show sign off time on sign-off page
    const signOffTime = sessionStorage.getItem("signOffTime") || "Not available";
    const signoffDetailsDiv = document.querySelector(".clnt-details.signoff");
    if (signoffDetailsDiv) {
        signoffDetailsDiv.innerHTML = `
        <strong>Sign off time:</strong> ${signOffTime}<br>
        <strong>Your IP Address:</strong> ${userIp}
        `;
    }
});