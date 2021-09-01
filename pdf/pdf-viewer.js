class PDFViewer {
    currentPage = 1;
    scale = 1.0;
    url = "";
    page;
    pdf;
    pdfjsLib;

    constructor() {
      this.pdfjsLib = window['pdfjs-dist/build/pdf'];
      this.pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    }
    
    async load(url) {
      this.url = url;
      
      // Asynchronous download of PDF
      var loadingTask = this.pdfjsLib.getDocument(url);
      this.pdf = await loadingTask.promise;
      console.log('PDF loaded');
      // Fetch the first page
      this.loadPage();
    }
    
    async loadPage() {
    let page = await this.pdf.getPage(this.currentPage);
      console.log('Page loaded');
      this.page = page;
      await this.render();
  
    }
    
    async zoomIn() {
      this.scale += 0.1;
      await this.render();
    }
    
    async zoomOut() {
      if (this.scale <= 1.0) return;
      this.scale -= 0.1;
      await this.render();
    }
    
    async nextPage() {
      if (this.currentPage >= this.pdf.numPages) return;
      this.currentPage ++;
      await this.loadPage();
    }
    
    async previousPage() {
      if (this.currentPage <= 1) return;
      this.currentPage --;
      await this.loadPage();
    }
    
    async render() {
       var viewport = this.page.getViewport({scale: this.scale});
  
      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = await this.page.render(renderContext);
        console.log('Page rendered');
    }
  }
  
  