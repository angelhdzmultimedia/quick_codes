//Constants
const PDF_FILE = "pdf_file.pdf";

//Controls
const zoomIn = document.querySelector("#zoom-in-btn");
const zoomOut = document.querySelector("#zoom-out-btn");
const next = document.querySelector("#next-btn");
const prev = document.querySelector("#prev-btn");

//Init

const viewer = new PDFViewer();

async function init() {
  try {
    loadPDF();
  } catch(e) {
    //Ignore
  }
}


function loadPDF() {
  viewer.load(PDF_FILE);
  zoomIn.addEventListener("click", (e) => {
    viewer.zoomIn();
  });

  zoomOut.addEventListener("click", (e) => {
    viewer.zoomOut();
  });
  
  next.addEventListener("click", (e) => {
    viewer.nextPage();
    console.log('Next page');
  });

  prev.addEventListener("click", (e) => {
    viewer.previousPage();
    console.log('Next page');
  });
}

init();
