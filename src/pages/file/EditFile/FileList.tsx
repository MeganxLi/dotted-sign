import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";

const FileList = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasListRef = useRef(null);

  return (
    <div>

      <canvas ref={canvasListRef} width={200} height={200}></canvas>

    </div>
  );
};

export default FileList;
