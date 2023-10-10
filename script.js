document.addEventListener("DOMContentLoaded", function() {
  var items = document.querySelectorAll(".item");
  var total = document.getElementById("total");

  var sum = 0;

  items.forEach(function(item) {
    var number = item.querySelector(".number");
    var decreaseBtn = item.querySelector(".decrease");

    var count = 0;

    item.addEventListener("click", function() {
      item.style.backgroundColor = "green";
      count++;
      number.textContent = count;
      setTimeout(function() {
        item.style.backgroundColor = "white";
      }, 100);

      calculateTotal();
    });

    decreaseBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (count > 0) {
        count--;
        number.textContent = count;
        calculateTotal();
      }
    });

    function calculateTotal() {
      sum = 0;
      items.forEach(function(item) {
        var count = parseInt(item.querySelector(".number").textContent);
        sum += count;
      });
      total.querySelector(".number").textContent = sum;
    }
  });



  // add to make pdf
  // function generatePDF() {
  //   console.log("MM");
  //   var content = document.documentElement.outerHTML;
  //   // Code to generate PDF using a PDF library or API
  //   // You can use libraries like jsPDF, pdfmake, or use a PDF generation API like PDFShift, etc.
  //   // Here's an example using jsPDF:
  //   const { jsPDF } = window.jspdf
  //   var doc = new jsPDF();
  //   doc.text(content, 10, 10);
  //   doc.save("page_content.pdf");
  // }
  // document.getElementById("generatePDFButton").addEventListener("click", generatePDF);  

  // function exportToExcel() {
  //   console.log("MM");
  //   // Get the data from the HTML elements
  //   const items = Array.from(document.querySelectorAll('.item'));
  //   const data = items.map(item => ({
  //     name: item.querySelector('.name').textContent,
  //     number: item.querySelector('.number').textContent
  //   }));
  
  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();
  
  //   // Create a new worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  
  //   // Add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
  
  //   // Generate the Excel file
  //   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  //   // Save the file using FileSaver.js (you need to include the library)
  //   saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'items.xlsx');
  // }

  function exportToExcel() {
    // Get the data from the HTML elements
    const items = Array.from(document.querySelectorAll('.item'));
    const totalItem = document.getElementById('total');
    const totalNumber = totalItem.querySelector('.number').textContent;
    
    const data = items.map(item => ({
      name: item.querySelector('.name').textContent,
      number: item.querySelector('.number').textContent
    }));
    data.push({
      name : "Total",
      number : totalNumber
    });
    
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the file using FileSaver.js (you need to include the library)
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'items.xlsx');
  }


  
  
  document.getElementById("exceloutput").addEventListener("click", exportToExcel);  

  

});
