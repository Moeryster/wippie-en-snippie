// Theme Song Logic
const audio = document.getElementById('theme-song');

let isMuted = localStorage.getItem('themeMuted') === 'true';

window.updateMuteIcons = function() {
    const icon = document.getElementById('mute-icon');
    const iconMuted = document.getElementById('mute-icon-muted');
    const iconMobile = document.getElementById('mute-icon-mobile');
    const iconMobileMuted = document.getElementById('mute-icon-mobile-muted');
    
    if (icon && iconMuted) {
        icon.classList.toggle('hidden', isMuted);
        iconMuted.classList.toggle('hidden', !isMuted);
    }
    if (iconMobile && iconMobileMuted) {
        iconMobile.classList.toggle('hidden', isMuted);
        iconMobileMuted.classList.toggle('hidden', !isMuted);
    }
};

if (audio) {
    audio.muted = isMuted;

    // Resume audio position safely
    const savedTime = localStorage.getItem('themeTime');
    if (savedTime) {
        audio.addEventListener('loadedmetadata', () => {
            audio.currentTime = parseFloat(savedTime);
        }, { once: true });
        // Fallback if metadata is already loaded
        if (audio.readyState >= 1) {
            audio.currentTime = parseFloat(savedTime);
        }
    }

    // Save audio position periodically
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('themeTime', audio.currentTime);
        }
    }, 1000);
    
    // Attempt autoplay
    if (!isMuted) {
        audio.play().catch(e => console.log("Autoplay blocked by browser. Music will start on first interaction."));
    }
    
    if (typeof window.updateMuteIcons === 'function') window.updateMuteIcons();
}

window.toggleMute = function() {
    if (!audio) return;
    isMuted = !isMuted;
    audio.muted = isMuted;
    localStorage.setItem('themeMuted', isMuted);
    
    if (!isMuted && audio.paused) {
        audio.play().catch(e => console.log("Playback failed:", e));
    }
    
    if (typeof window.updateMuteIcons === 'function') window.updateMuteIcons();
};

// Try to play on first interaction
document.addEventListener('click', () => {
    if (audio && !isMuted && audio.paused) {
        audio.play().catch(e => console.log("Autoplay prevented:", e));
    }
}, { once: true });

// Initial icon update
if (typeof updateMuteIcons === 'function') updateMuteIcons();

// Language toggle logic
let currentLang = localStorage.getItem('lang') || 'af';

window.toggleLanguage = function() {
    currentLang = currentLang === 'af' ? 'en' : 'af';
    localStorage.setItem('lang', currentLang);
    updateContent();
};

window.updateContent = function() {
    if (!window.pageTranslations) return;
    
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.pageTranslations[currentLang] && window.pageTranslations[currentLang][key]) {
            el.innerHTML = window.pageTranslations[currentLang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (window.pageTranslations[currentLang] && window.pageTranslations[currentLang][key]) {
            el.placeholder = window.pageTranslations[currentLang][key];
        }
    });

    // Update button text
    const langText = document.getElementById('lang-text');
    const langTextMobile = document.getElementById('lang-text-mobile');
    if (langText && window.pageTranslations[currentLang]) langText.innerText = window.pageTranslations[currentLang].lang_btn;
    if (langTextMobile && window.pageTranslations[currentLang]) langTextMobile.innerText = window.pageTranslations[currentLang].lang_btn;
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
};

// Mobile menu toggle
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
};

// Initialize content
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
});
