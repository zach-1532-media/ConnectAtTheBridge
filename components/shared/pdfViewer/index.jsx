/* eslint-disable react/jsx-no-bind */
import { React, useState } from 'react';
// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf';
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../../../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer() {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(
    'https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/Resume.pdf'
  );
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
