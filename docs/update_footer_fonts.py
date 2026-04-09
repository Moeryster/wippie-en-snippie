import glob

html_files = glob.glob('*.html')

old_span = '<span class="font-rounded font-bold text-xl text-secondary">Wippie en Snippie</span>'
new_span = '<span class="font-adlam text-xl text-secondary">Wippie en Snippie</span>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace(old_span, new_span)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file}")
