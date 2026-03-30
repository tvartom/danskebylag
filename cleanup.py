import re, sys, os

def clean_chapter(raw_path, out_path):
    with open(raw_path, 'r') as f:
        text = f.read()
    
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        stripped = line.strip()
        # Remove standalone page numbers (1-3 digit numbers alone on a line)
        if re.match(r'^\d{1,3}$', stripped):
            continue
        # Remove form feed characters
        line = line.replace('\f', '')
        cleaned_lines.append(line)
    
    text = '\n'.join(cleaned_lines)
    
    # Fix spaced-out headings (e.g., "F Ø R S T E  K A P I T E L")
    def fix_spaced(m):
        return re.sub(r'\s+', '', m.group(0))
    # Match lines that are mostly spaced-out uppercase
    text = re.sub(r'^[A-ZÆØÅÉÄ](?:\s+[A-ZÆØÅÉÄ.,\-\':()])+\s*$', fix_spaced, text, flags=re.MULTILINE)
    
    # Re-join hyphenated words across lines
    text = re.sub(r'(\w)­\s*\n\s*(\w)', r'\1\2', text)  # soft hyphen
    text = re.sub(r'(\w)-\s*\n\s*(\w)', r'\1\2', text)   # regular hyphen at line end
    
    # Collapse multiple blank lines to max 2
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    
    # Fix common OCR: 'cr' at word boundary that should be 'er'  
    # (only do this carefully - 'cr' → 'er' when it's clearly wrong)
    # Skip this - too risky without context
    
    # Remove leading/trailing whitespace on lines but preserve indentation intent
    result_lines = []
    for line in text.split('\n'):
        result_lines.append(line.rstrip())
    text = '\n'.join(result_lines)
    
    # Trim start/end
    text = text.strip() + '\n'
    
    with open(out_path, 'w') as f:
        f.write(text)
    
    return len(text.split('\n'))

base = '/workspace/apps/web/content/chapters'
for chapter_dir in sorted(os.listdir(base)):
    raw = os.path.join(base, chapter_dir, 'raw.txt')
    out = os.path.join(base, chapter_dir, 'da.md')
    if os.path.exists(raw):
        n = clean_chapter(raw, out)
        print(f'{chapter_dir}: {n} lines')

