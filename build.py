"""Regenerate the standalone local page from dist/."""
from pathlib import Path
root = Path(__file__).resolve().parent
source = root / 'dist'
html = (source / 'index.html').read_text()
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + (source / 'style.css').read_text() + '</style>')
for name in ['i18n.js', 'replay.js', 'game.js']:
    html = html.replace('<script src="' + name + '"></script>', '<script>' + (source / name).read_text() + '</script>')
(root / 'index.html').write_text(html)
print('Built blackjack index.html')
