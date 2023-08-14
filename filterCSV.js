const fs = require('fs');

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

  // Initialize an empty array to store filtered lines
  const filteredLines = [];

  // Process each line
  lines.forEach(line => {
    const [description, property, value] = line.split(',');
    if (propertiesToFilter.includes(property)) {
      filteredLines.push(`${property}, ${value}`);
    }
  });

  // Write filtered property values to a text file
  const output = filteredLines.join('\n');

  fs.writeFile('output.txt', output, err => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Filtered data saved to output.txt');
    }
  });
});