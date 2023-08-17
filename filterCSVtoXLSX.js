const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Define the properties you want to filter
const propertiesToFilter = [
  'TimeToLoadCheckoutStep1',
  'TimeToLoadUpdatingCartName',
  'IncreaseQuantity',
  'TimeToLoadProductDetailsPage',
  'AddAccessoryToCart',
  'DecreaseQuantity',
  'TimeToLoadHomePage',
  'TimeToAddProductFromQuickOrder',
  'TimeToAddProductFromFavoriteLists',
  'TimeToLoadUpdatingNotes',
  'TimeToLoadCheckoutStep2',
  'TimeToLoadOrderConfirmationPage'
];

// Get the list of CSV files with "feed_" prefix in the root folder
const csvFiles = fs.readdirSync(__dirname).filter(file => file.startsWith('feed_') && file.endsWith('.csv'));

// Process each CSV file
csvFiles.forEach(csvFile => {
  const data = fs.readFileSync(csvFile, 'utf8');
  const lines = data.split('\n');

  // Initialize arrays to store filtered data for medium and large cart sizes
  const filteredDataMedium = [];
  const filteredDataLarge = [];

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

  // Create folder based on the filename
  const folderName = csvFile.replace('feed_', '').replace('.csv', '');
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  const workbookMedium = XLSX.utils.book_new();
  const worksheetMedium = XLSX.utils.aoa_to_sheet(filteredDataMedium);
  XLSX.utils.book_append_sheet(workbookMedium, worksheetMedium, 'FilteredData');
  XLSX.writeFile(workbookMedium, path.join(folderName, 'output-medium.xlsx'), { bookType: 'xlsx', defaultCellStyle: { numFmt: '0' } });

  const workbookLarge = XLSX.utils.book_new();
  const worksheetLarge = XLSX.utils.aoa_to_sheet(filteredDataLarge);
  XLSX.utils.book_append_sheet(workbookLarge, worksheetLarge, 'FilteredData');
  XLSX.writeFile(workbookLarge, path.join(folderName, 'output-large.xlsx'), { bookType: 'xlsx', defaultCellStyle: { numFmt: '0' } });

  console.log(`Processed ${csvFile} and saved output files in ${folderName}`);
});