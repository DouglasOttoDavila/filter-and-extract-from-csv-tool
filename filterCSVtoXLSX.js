const fs = require('fs');
const XLSX = require('xlsx');

// Define the properties you want to filter
const propertiesToFilter = [
    'TimeToLoadShoppingCartMedium Cart',
    'TimeToLoadShoppingCartLarge Cart',
    'TimeToLoadUpdatingCartName',
    'IncreaseQuantity',
    'TimeToLoadProductDetailsPage',
    'AddAccessoryToCart',
    'DecreaseQuantity',
    'TimeToLoadHomePage',
    'TimeToAddProductFromQuickOrder',
    'TimeToAddProductFromFavoriteLists',
    'TimeToLoadUpdatingNotes',
    'TimeToLoadCheckoutStep1',
    'TimeToLoadCheckoutStep2',
    'TimeToLoadOrderConfirmationPage'
];

// Read the CSV file
fs.readFile('input.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    // Split the data into lines
    const lines = data.split('\n');
  
    // Initialize arrays to store filtered data for medium and large cart sizes
    const filteredDataMedium = [];
    const filteredDataLarge = [];
  
    // Process each line
    lines.forEach(line => {
      const [description, property, value] = line.split(',');
      if (propertiesToFilter.includes(property)) {
        const seconds = Math.round(parseFloat(value) / 1000);
        const filteredLine = [property, seconds];
  
        if (description.includes('Medium')) {
          filteredDataMedium.push(filteredLine);
        } else if (description.includes('Large')) {
          filteredDataLarge.push(filteredLine);
        }
      }
    });
  
    // Create workbooks and add worksheets for medium and large cart sizes
    const workbookMedium = XLSX.utils.book_new();
    const worksheetMedium = XLSX.utils.aoa_to_sheet(filteredDataMedium);
    XLSX.utils.book_append_sheet(workbookMedium, worksheetMedium, 'FilteredData');
  
    const workbookLarge = XLSX.utils.book_new();
    const worksheetLarge = XLSX.utils.aoa_to_sheet(filteredDataLarge);
    XLSX.utils.book_append_sheet(workbookLarge, worksheetLarge, 'FilteredData');
  
    // Write the workbooks to XLS files
    XLSX.writeFile(workbookMedium, 'output-medium.xlsx', { bookType: 'xls', defaultCellStyle: { numFmt: '0' } });
    XLSX.writeFile(workbookLarge, 'output-large.xlsx', { bookType: 'xls', defaultCellStyle: { numFmt: '0' } });
  
    console.log('Filtered data saved to output-medium.xlsx and output-large.xlsx');
  });