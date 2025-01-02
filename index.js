async function getData() {
  const response = await fetch("apple_stock.csv");
  const data = await response.text();
  const rows = data.split("\n").slice(1); 

  const dates = [];
  const prices = [];

  rows.forEach((elem) => {
      const row = elem.split(",");
      const date = row[0].split(" ")[0]; // to only get the date and not the time after 
      const price = parseFloat(row[2]); // close price (3rd column)
      dates.push(date);
      prices.push(price);
  });

  return { dates, prices };
}

async function createChart() {
  const data = await getData(); 

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line', 
    
    data: {
      labels: data.dates, 
      datasets: [{
        label: 'Apple Inc. Stock Prices', 
        data: data.prices, 
        borderWidth: 1,
      }]
    },

    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: { // y axis title
            display: true,
            text: "Stock Price"
          }
        },
        x: {
          title: { // x axis title
            display: true,
            text: "Date"
          }
        }
      },
      // https://www.chartjs.org/docs/latest/configuration/title.html
      plugins: {
        title: { 
          display: true, 
          text: 'Apple Inc. Historical Stock Prices',
          font: { 
            size: 24
          }
        }
      }
    }
  });
}

createChart();




  