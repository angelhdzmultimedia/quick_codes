async function loadSettings() {
    const myFile = await fetch("data.json");
    const json = await myFile.json();
    return json.mySexyPDF;
}

//Controls
const zoomIn = document.querySelector("#zoom-in-btn");
const zoomOut = document.querySelector("#zoom-out-btn");
const next = document.querySelector("#next-btn");
const prev = document.querySelector("#prev-btn");

//Init
let myFile;
const viewer = new PDFViewer();

async function init() {
  myFile = await loadSettings();
  loadPDF();
}

async function loadPDF() {
  const res = await fetch(myFile);
  const blob = await res.blob();
  const file =  new File([blob], "myFile", { type: 'application/pdf' });
  const url = URL.createObjectURL(file);

  viewer.load(url);
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
