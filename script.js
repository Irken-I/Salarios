let incomeCategories = [];
let counts = [];
let userIncome = null;

function loadData() {
    fetch('https://raw.githubusercontent.com/Irken-I/Salarios/main/Libro2.csv')
        .then(response => response.text())
        .then(data => {
            let parsedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            }).data;

            incomeCategories = parsedData.map(row => row.incomeList);
            counts = parsedData.map(row => row.countList);

            drawPlot();
        })
        .catch(error => console.error(error));
}

loadData();


function drawPlot() {
    let trace = {
        x: incomeCategories,
        type: 'histogram',
        autobinx: false,
        xbins: {
            start: Math.min(...incomeCategories),
            end: Math.max(5000000),
            size: 100000
        },
        marker: {
            color: '#1F77B4',
            line: {
                color: '#000000',
                width: 1
            }
        }
    };

    let layout = {
        title: 'Distribucion del ingreso mensual',
        xaxis: {
            title: 'Ingreso mensual',
            color: '#000000',
            linecolor: '#000000',
            linewidth: 2
        },
        yaxis: {
            title: 'Densidad',
            color: '#000000',
            linecolor: '#000000',
            linewidth: 2
        },
        paper_bgcolor: '#FFFFFF',
        plot_bgcolor: '#FFFFFF',

    };

    Plotly.newPlot('densityPlot', [trace], layout).then(function () {
        Plotly.relayout('densityPlot', { shapes: layout.shapes });
    });
}


// Assuming you have included the Papa Parse library in your HTML file

function compareIncome() {
    const userIncome = parseFloat(document.getElementById("incomeInput").value);
    
    // Fetch the CSV file
    fetch('https://raw.githubusercontent.com/Irken-I/Salarios/main/Libro2.csv')
      .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data using Papa Parse
        const parsedData = Papa.parse(csvData, { header: true }).data;
        
        // Get the 'income' and 'percentage' columns as arrays
        const incomeList = parsedData.map(row => parseFloat(row.incomeList));
        const percentageList = parsedData.map(row => parseFloat(row.percentageList));
        
        // Find the closest income value to the user's input
        const closestIncome = incomeList.reduce((prev, curr) => Math.abs(curr - userIncome) < Math.abs(prev - userIncome) ? curr : prev);
        
        // Find the index of the closest income value
        const closestIndex = incomeList.indexOf(closestIncome);
        
        // Retrieve the corresponding percentage value
        const percentage = percentageList[closestIndex];
        
        // Compare user's income to the closest income and display the result
        
        // Display the retrieved percentage
        document.getElementById("percentage").innerText = `Usted está en el ${percentage}%  de ingreso, usted gana más que ${Math.round(22793698 * (percentage / 100))} trabajadores`;
      })
      .catch(error => console.error(error));
  }
  
  // Add event listener to the compare button
  document.getElementById("compareButton").addEventListener("click", compareIncome);