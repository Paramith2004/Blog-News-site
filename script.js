// ============================================
//   PULSENEWS - script.js
//   DecodeLabs Project 1 | JavaScript Logic
//   State Management & Interactivity
// ============================================


// ===== 1. HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', isOpen);

    // Animate hamburger bars → X
    hamburger.classList.toggle('open', isOpen);
});

// Close menu when a nav link is clicked (mobile UX)
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    }
});


// ===== 2. ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');

            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// ===== 3. NEWSLETTER SUBSCRIBE =====
const subscribeBtn = document.getElementById('subscribe-btn');
const emailInput   = document.querySelector('.email-input');
const subscribeMsg = document.getElementById('subscribe-msg');

subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showMessage('Please enter your email address.', 'error');
        emailInput.focus();
        return;
    }

    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
    }

    // Simulate subscribe success
    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Subscribing...';

    setTimeout(() => {
        showMessage(`✅ You're subscribed! Welcome to PulseNews, ${email.split('@')[0]}.`, 'success');
        emailInput.value = '';
        subscribeBtn.textContent = 'Subscribed ✓';
        subscribeBtn.style.backgroundColor = 'var(--world-color)';
    }, 1000);
});

// Allow pressing Enter in email input
emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') subscribeBtn.click();
});

function showMessage(text, type) {
    subscribeMsg.textContent = text;
    subscribeMsg.style.color = type === 'error' ? '#e74c3c' : 'var(--moonlit)';
}


// ===== 4. STICKY HEADER SHADOW ON SCROLL =====
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
});


// ===== 5. ARTICLE CARDS — FADE IN ON SCROLL =====
const cards = document.querySelectorAll('.article-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target); // animate once
        }
    });
}, { threshold: 0.1 });

// Set initial hidden state and observe
cards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});


// ===== 6. SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
    });
});