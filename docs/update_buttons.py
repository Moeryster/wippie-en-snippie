import os
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Desktop button
    old_desktop_btn = '''<button onclick="toggleLanguage()" class="flex items-center space-x-1 bg-secondary hover:opacity-90 px-3 py-1.5 rounded-full transition-colors text-sm font-bold text-white">
                        <i data-lucide="languages" class="w-4 h-4"></i>
                        <span id="lang-text">EN</span>
                    </button>'''
    
    new_desktop_btn = '''<button onclick="toggleLanguage()" class="flex items-center space-x-1.5 bg-[#eef2f6] hover:bg-[#e2e8f0] px-4 py-2 rounded-full transition-colors text-sm font-semibold text-[#334155]">
                        <i data-lucide="globe" class="w-4 h-4"></i>
                        <span id="lang-text">English</span>
                    </button>'''
    
    # Mobile button
    old_mobile_btn = '''<button onclick="toggleLanguage()" class="flex items-center space-x-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-bold text-white">
                    <i data-lucide="languages" class="w-4 h-4"></i>
                    <span id="lang-text-mobile">EN</span>
                </button>'''
    
    new_mobile_btn = '''<button onclick="toggleLanguage()" class="flex items-center space-x-1.5 bg-[#eef2f6] px-4 py-2 rounded-full text-sm font-semibold text-[#334155]">
                    <i data-lucide="globe" class="w-4 h-4"></i>
                    <span id="lang-text-mobile">English</span>
                </button>'''
                
    content = content.replace(old_desktop_btn, new_desktop_btn)
    content = content.replace(old_mobile_btn, new_mobile_btn)
    
    # Translations
    content = content.replace('lang_btn: "EN"', 'lang_btn: "English"')
    content = content.replace('lang_btn: "AF"', 'lang_btn: "Afrikaans"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {file}")
