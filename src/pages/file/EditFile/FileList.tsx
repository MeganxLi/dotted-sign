import { PrimitiveAtom, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { pdfjs, Page, Document } from "react-pdf";
import { fileAtom } from "../../../jotai";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileList = () => {
  const [pdfURL] =
    useAtom<PrimitiveAtom<string | ArrayBuffer | null>>(fileAtom);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasListRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        className="pdf-viewer"
        file={pdfURL}
        // onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page className="page" pageNumber={pageNumber} scale={1} />
      </Document>
    </div>
  );
};

export default FileList;
