document.addEventListener('click', function(e) {
    const a = e.target.closest('a');
    if (a && a.href && a.host === window.location.host && !a.hasAttribute('download') && a.target !== '_blank') {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(a.href);
        
        if (currentUrl.pathname === targetUrl.pathname && currentUrl.search === targetUrl.search) {
            // It's just a hash change or the same page, let the browser handle it
            return;
        }
        
        e.preventDefault();
        const url = a.href;
        history.pushState(null, '', url);
        loadPage(url);
    }
});

window.addEventListener('popstate', function() {
    loadPage(window.location.href);
});

async function loadPage(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        document.title = doc.title;
        
        // Extract new translations
        const scripts = Array.from(doc.querySelectorAll('script'));
        for (const script of scripts) {
            if (script.textContent.includes('window.pageTranslations =')) {
                const match = script.textContent.match(/window\.pageTranslations\s*=\s*(\{[\s\S]*?\});/);
                if (match) {
                    window.pageTranslations = new Function('return ' + match[1])();
                }
                break;
            }
        }
        
        const currentAudio = document.getElementById('theme-song');
        
        // Remove old content
        Array.from(document.body.children).forEach(child => {
            if (child.id !== 'theme-song' && child.tagName !== 'SCRIPT') {
                child.remove();
            }
        });
        
        // Append new content
        Array.from(doc.body.children).forEach(child => {
            if (child.id !== 'theme-song' && child.tagName !== 'SCRIPT') {
                document.body.insertBefore(child, currentAudio);
            }
        });
        
        if (typeof window.updateContent === 'function') window.updateContent();
        if (typeof window.updateMuteIcons === 'function') window.updateMuteIcons();
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
        
        const targetUrl = new URL(url);
        if (targetUrl.hash) {
            const targetEl = document.querySelector(targetUrl.hash);
            if (targetEl) {
                targetEl.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
        
    } catch (err) {
        console.error('Failed to load page:', err);
        window.location.href = url; // fallback
    }
}
