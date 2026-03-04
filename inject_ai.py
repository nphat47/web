import glob
import re

html_files = glob.glob(r'd:\2-2\307\1\*.html')

robot_html = """
    <!-- AI Assistant 3D Robot -->
    <div class="ai-mascot-container" id="aiMascot">
        <div class="ai-tooltip" id="aiTooltip">สวัสดี!<br>คลิกเพื่อดูเมนู</div>
        <div class="ai-mascot-3d">
            <div class="mascot-antenna"><div class="mascot-antenna-bulb"></div></div>
            <div class="mascot-head">
                <div class="mascot-face">
                    <div class="mascot-eye left"></div>
                    <div class="mascot-eye right"></div>
                    <div class="mascot-smile"></div>
                </div>
                <div class="mascot-ear left"></div>
                <div class="mascot-ear right"></div>
            </div>
            <div class="mascot-body">
                <div class="mascot-screen">
                    <div class="mascot-heart"><i class="fas fa-heart"></i></div>
                </div>
            </div>
            <div class="mascot-arm left"></div>
            <div class="mascot-arm right"></div>
            <div class="mascot-base"></div>
            <div class="mascot-shadow"></div>
        </div>
        
        <div class="ai-menu" id="aiMenu">
            <ul>
                <li><a href="index.html"><i class="fas fa-home"></i> หน้าแรก</a></li>
                <li><a href="units.html"><i class="fas fa-book"></i> บทเรียน</a></li>
                <li><a href="quiz.html"><i class="fas fa-pencil-alt"></i> แบบทดสอบ</a></li>
                <li id="aiCloseMenu"><i class="fas fa-times"></i> ปิด</li>
            </ul>
        </div>
    </div>
"""

script_tag = '<script src="ai_script.js"></script>\n</body>'
link_tag = '<link rel="stylesheet" href="ai_style.css">\n</head>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated = False
    if 'ai-mascot-container' not in content:
        content = re.sub(r'</body>', robot_html + '\n' + script_tag, content, flags=re.IGNORECASE)
        updated = True
    if 'ai_style.css' not in content:
        content = re.sub(r'</head>', link_tag, content, flags=re.IGNORECASE)
        updated = True
        
    if updated:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print("AI Assistant added to all HTML files.")
