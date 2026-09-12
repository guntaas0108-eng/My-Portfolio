/**
 * js/script.js
 * Developer Portfolio Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. CINEMATIC LOADING SCREEN
    // ==========================================
    const loader = document.getElementById('loader');
    const roomScene = document.querySelector('.room-scene');
    const percentageText = document.getElementById('loader-percentage');
    const progressBar = document.getElementById('loader-progress');
    const loadingStatus = document.querySelector('.loader-text');

    if (loader) {
        const statusMessages = [
            "Booting OS...",
            "Establishing connection...",
            "Compiling portfolio assets...",
            "Initializing user interface...",
            "Access granted."
        ];

        let progress = 0;
        document.body.style.overflow = 'hidden'; 

        const intervalSpeed = 50; 
        const loadingInterval = setInterval(() => {
            progress += 1; 
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                if (percentageText) percentageText.textContent = `100%`;
                if (progressBar) progressBar.style.width = `100%`;
                if (loadingStatus) loadingStatus.textContent = statusMessages[4];

                setTimeout(() => {
                    if (roomScene) roomScene.classList.add('zoom-in');
                    
                    setTimeout(() => {
                        loader.classList.add('fade-out');
                        document.body.style.overflow = ''; 
                    }, 1200); 
                    
                }, 500); 
                return;
            }

            if (percentageText) percentageText.textContent = `${progress}%`;
            if (progressBar) progressBar.style.width = `${progress}%`;

            if (loadingStatus) {
                if (progress < 25) loadingStatus.textContent = statusMessages[0];
                else if (progress < 50) loadingStatus.textContent = statusMessages[1];
                else if (progress < 75) loadingStatus.textContent = statusMessages[2];
                else loadingStatus.textContent = statusMessages[3];
            }
        }, intervalSpeed);
    }

    // ==========================================
    // 1. DYNAMIC TERMINAL TYPING EFFECT
    // ==========================================
    const terminalBody = document.querySelector('.code-content');
    
    if (terminalBody) {
        const commands = [
            { cmd: "whoami", out: "guntaas-singh" },
            { cmd: "education", out: "Computer Science @ TIET" },
            { cmd: "status", out: "Building & Learning 🚀" },
            { cmd: "passion", out: "Code • Create • Solve" }
        ];

        terminalBody.innerHTML = ''; 

        const delay = ms => new Promise(res => setTimeout(res, ms));

        function typeText(element, text, speed) {
            return new Promise(resolve => {
                let i = 0;
                let interval = setInterval(() => {
                    element.textContent += text.charAt(i);
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        resolve();
                    }
                }, speed);
            });
        }

        async function runTerminal() {
            for (const item of commands) {
                const cmdLine = document.createElement('p');
                cmdLine.innerHTML = `<span class="code-purple">$</span> <span class="typing"></span>`;
                terminalBody.appendChild(cmdLine);
                const textSpan = cmdLine.querySelector('.typing');

                await typeText(textSpan, item.cmd, 100);
                await delay(400); 

                const outLine = document.createElement('p');
                outLine.className = 'code-output';
                outLine.style.opacity = '0'; 
                outLine.textContent = item.out;
                terminalBody.appendChild(outLine);

                requestAnimationFrame(() => {
                    outLine.style.opacity = '1';
                });
                
                terminalBody.appendChild(document.createElement('br'));
                await delay(900); 
            }
            
            const finalLine = document.createElement('p');
            finalLine.innerHTML = `<span class="code-purple">$</span> <span class="blink">_</span>`;
            terminalBody.appendChild(finalLine);
        }

        // Starts at 6.5 seconds so the 5-second cinematic zoom finishes first
        setTimeout(runTerminal, 6500); 
    }

    // ==========================================
    // 2. PREMIUM SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll(
        '.section-header, .about-container, .skill-category, .project-card, .currently-card, .achievement-card, .certificate-card, .timeline-item, .contact-container'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('hidden-state');
        scrollObserver.observe(el);
    });

    // ==========================================
    // 3. 3D PROJECT CARD TILT EFFECT
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card, .certificate-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease'; 
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease'; 
        });
    });
    // ==========================================
    // LIVE WEBSITE COLOR POP & TRANSITION EFFECT
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a');
    const transitionOverlay = document.querySelector('.color-transition-overlay');

    navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();

        // 1. HOVER EFFECT: Color pop when hovering over "home"
        if (linkText.includes('home')) {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('home-color-pop');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('home-color-pop');
            });
        }

        // 2. CLICK EFFECT: Smooth color wipe transition like a live SPA
        link.addEventListener('click', (e) => {
            const targetHref = link.getAttribute('href');
            
            // Check if it's an internal section link (e.g., #home, #about, #projects)
            if (targetHref && targetHref.startsWith('#')) {
                e.preventDefault();
                
                // Trigger color overlay sweep
                if (transitionOverlay) {
                    transitionOverlay.classList.add('active');
                }

                // Wait for the overlay to cover the screen, then jump/scroll and lift overlay
                setTimeout(() => {
                    const targetSection = document.querySelector(targetHref);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }

                    // Remove overlay color wipe
                    setTimeout(() => {
                        if (transitionOverlay) {
                            transitionOverlay.classList.remove('active');
                        }
                    }, 400);

                }, 450);
            }
        });
    });
});