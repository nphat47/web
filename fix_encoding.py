import glob

html_files = glob.glob(r'd:\2-2\307\1\*.html')

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            broken_str = f.read()
            
        # Powsershell Get-Content reads using system code page (ANSI) which is `cp874` for Thai users usually.
        # But wait, [System.Text.Encoding]::UTF8 was used to write.
        # So broken_str was written as UTF-8. Which means `broken_str` is already python's unicode string.
        # It was originally read as `cp874` when it should have been read as `utf-8`.
        
        # We need to turn string back into bytes as if it was `cp874`.
        # To do that, we test encodings
        fixed = False
        for encoding in ['cp874', 'windows-1252', 'iso-8859-1']:
            try:
                original_bytes = broken_str.encode(encoding)
                fixed_str = original_bytes.decode('utf-8')
                
                # Verify it looks like HTML
                if "หน้าแรก" in fixed_str or "<html" in fixed_str.lower() or "บทเรียน" in fixed_str:
                    with open(file, 'w', encoding='utf-8') as fw:
                        fw.write(fixed_str)
                    print(f"Fixed {file} with {encoding}")
                    fixed = True
                    break
            except Exception:
                continue
                
        if not fixed:
            print(f"Could not fix {file}")
            
    except Exception as e:
        print(f"Error on {file}: {e}")
