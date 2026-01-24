const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

const extractText = async (file) => {
    try {
        if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
            const dataBuffer = fs.readFileSync(file.path);

            // Check for PDF header
            const header = dataBuffer.toString('utf8', 0, 5);
            if (header !== '%PDF-') {
                throw new Error('The file is not a valid PDF. Please upload a correct PDF document.');
            }

            try {
                const data = await pdf(dataBuffer);
                return data.text;
            } catch (pdfErr) {
                if (pdfErr.message.includes('Invalid PDF structure')) {
                    throw new Error('This PDF is corrupted or password-protected. Please upload a standard PDF.');
                }
                throw pdfErr;
            }
        } else if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword' ||
            file.originalname.toLowerCase().endsWith('.docx') ||
            file.originalname.toLowerCase().endsWith('.doc')
        ) {
            const result = await mammoth.extractRawText({ path: file.path });
            return result.value;
        } else {
            console.log('Unsupported file type:', file.mimetype, file.originalname);
            throw new Error(`Unsupported file type: ${file.originalname}. Please use PDF or DOCX.`);
        }
    } catch (error) {
        console.error('Error extracting text:', error);
        throw error;
    }
};

module.exports = extractText;
