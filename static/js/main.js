// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Language toggle functionality
const langToggle = document.querySelector('.lang-toggle');
const langText = langToggle.querySelector('.lang-text');

// Check for saved language preference or default to English
const savedLang = localStorage.getItem('language') || 'en';
document.documentElement.setAttribute('lang', savedLang);
updateLanguage(savedLang);

langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    updateLanguage(newLang);
});

function updateLanguage(lang) {
    // Update language text in toggle button
    langText.textContent = lang.toUpperCase();
    
    // Update all elements with data-en and data-pt attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update experience meta spans
    document.querySelectorAll('.experience-meta .lang-en, .experience-meta .lang-pt').forEach(element => {
        element.style.display = element.classList.contains(`lang-${lang}`) ? 'block' : 'none';
    });
}

// Show more button functionality
document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const experienceList = button.previousElementSibling;
        const isExpanded = experienceList.classList.contains('expanded');
        
        experienceList.classList.toggle('expanded');
        button.classList.toggle('expanded');
        
        // Update button text based on current language
        const currentLang = document.documentElement.getAttribute('lang');
        const buttonText = isExpanded ? 
            button.getAttribute(`data-${currentLang}-show`) : 
            button.getAttribute(`data-${currentLang}-less`);
        button.textContent = buttonText;
    });
}); 