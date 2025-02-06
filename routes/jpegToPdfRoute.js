const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit'); // Using pdfkit for PDF creation
const path = require('path');

// Initialize the router
const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG files are allowed!'), false);
    }
  }
});

// Route to handle JPEG to PDF conversion
router.post('/convert', upload.single('jpegFile'), (req, res) => {
  try {
    // Validate file presence
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create a PDF document
    const doc = new PDFDocument();
    const outputFilePath = path.join(__dirname, 'output', `${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(outputFilePath);

    // Pipe the PDF document to a file
    doc.pipe(writeStream);

    // Add the JPEG image to the PDF
    doc.image(req.file.path, {
      fit: [500, 400],
      align: 'center',
      valign: 'center'
    });

    // Finalize the PDF and end the stream
    doc.end();

    // Handle the finish event of the write stream
    writeStream.on('finish', () => {
      // Send the PDF file as a response
      res.download(outputFilePath, (err) => {
        if (err) {
          res.status(500).send('Error downloading the file.');
        }

        // Clean up the uploaded JPEG file
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting the uploaded JPEG file:', err);
        });
      });
    });

  } catch (error) {
    res.status(500).send('An error occurred during the conversion process.');
  }
});

// Export the router
module.exports = router;