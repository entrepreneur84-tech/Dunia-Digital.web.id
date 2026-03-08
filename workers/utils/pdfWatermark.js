
import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * applyWatermark
 * @param {string} filePath - path file PDF asli
 * @param {string} watermarkText - nama pembeli untuk watermark
 * @returns {Uint8Array} buffer PDF baru dengan watermark
 */
export async function applyWatermark(filePath, watermarkText) {
  // Baca file PDF asli
  const existingPdfBytes = fs.readFileSync(filePath);

  // Load PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 2 - 100,
      y: height / 2,
      size: 36,
      font: font,
      color: rgb(0.85, 0.85, 0.85),
      rotate: { degrees: 45 },
      opacity: 0.3,
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
                  }
