const pdfjsLib = require('pdfjs-dist');
const path = require('path');
const fs = require('fs');
const { createCanvas } = require('canvas');

const docsDir = 'D:\\Work\\MobileApp\\sujon-all-personal-mobile-apps\\childgamebd\\documents';
const outBase = '/tmp/pdfextract';
const scale = 2.0;

const files = [
  '01 Letter & Word Adventure UI.pdf',
  '02 Word Seek Rush.pdf',
  '03 Guess the Word from Clue.pdf',
  '04 Word Search.pdf',
  '05 Block fill.pdf',
  '06 Subject Quiz.pdf',
  '07 Word Matching game.pdf',
  '08 Name–Place–Flower–Fruit.pdf',
];

(async () => {
  for (const f of files) {
    const pdfPath = path.join(docsDir, f);
    const outDir = path.join(outBase, f.replace(/\.pdf$/i, ''));
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n===== ${f} =====`);
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: pdfPath,
        cMapPacked: true,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      });
      const pdf = await loadingTask.promise;
      console.log(`Pages: ${pdf.numPages}`);

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const textContent = await page.getTextContent();
        const textStr = textContent.items.map((it) => it.str).join(' ');
        fs.writeFileSync(path.join(outDir, `page_${pageNum}.txt`), textStr || '(no text)');

        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;
        const imgPath = path.join(outDir, `page_${pageNum}.png`);
        fs.writeFileSync(imgPath, canvas.toBuffer('image/png'));
        console.log(`  Page ${pageNum}: ${viewport.width}x${viewport.height}, text len=${textStr.length}`);
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }
})();