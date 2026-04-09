import glob

html_files = glob.glob('*.html')

old_link = '<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">'
new_link = '<link href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Quicksand:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">'

old_tailwind = '''            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                rounded: ['Quicksand', 'sans-serif'],
            },'''
new_tailwind = '''            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                rounded: ['Quicksand', 'sans-serif'],
                adlam: ['"ADLaM Display"', 'sans-serif'],
            },'''

old_logo_span = '<span class="font-rounded font-black text-2xl text-secondary leading-tight">Wippie en Snippie</span>'
new_logo_span = '<span class="font-adlam text-2xl text-secondary leading-tight">Wippie en Snippie</span>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace(old_link, new_link)
    content = content.replace(old_tailwind, new_tailwind)
    content = content.replace(old_logo_span, new_logo_span)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file}")
