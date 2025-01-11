document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.getElementById('searchButton');
    const stockPerformance = document.getElementById('stockPerformance');
    const newsFeed = document.getElementById('newsFeed');
    const stockDetails = document.getElementById('stockDetails');
    const macroIndicators = document.getElementById('macroIndicators');
    const apiKey = "YOUR_NEWS_API_KEY"; // Replace with your actual NewsAPI key

    searchButton.addEventListener('click', function() {
        const stockSymbol = document.getElementById('stockSymbol').value;
        if (stockSymbol) {
          fetchStockData(stockSymbol)
              .then(data => {
                stockPerformance.innerHTML = generateStockPerformance(data);
              })
               .catch(error => {
                  stockPerformance.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
              });
        } else {
          stockPerformance.innerHTML = '<p> Please enter a stock symbol </p>';
        }
    });

    fetchNews()
        .then(data => {
           newsFeed.innerHTML = generateNewsFeed(data);
        })
        .catch(error => {
              newsFeed.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });

    stockDetails.innerHTML = generateStockDetails();
    macroIndicators.innerHTML = generateMacroIndicators();

    const dummyData = {
       "AAPL": {
        "currentPrice": 175.00,
        "openPrice": 170.00,
        "closePrice": 174.00,
        "marketCap": "2.7 Trillion",
         "peRatio": "30.2",
        "dividendYield": "0.5%"
      },
        "GOOG": {
        "currentPrice": 135.00,
        "openPrice": 130.00,
        "closePrice": 134.00,
        "marketCap": "1.8 Trillion",
         "peRatio": "25.2",
         "dividendYield": "0.2%"
      },
        "TSLA": {
          "currentPrice": 250.00,
          "openPrice": 245.00,
          "closePrice": 249.00,
           "marketCap": "800 Billion",
            "peRatio": "70.2",
          "dividendYield": "0%"
        }

    };
      function fetchStockData(stockSymbol) {
          return new Promise((resolve, reject) => {
           const data = dummyData[stockSymbol.toUpperCase()]
             if (data) {
              resolve(data);
             } else {
              reject(new Error('Stock not found'))
            }
          })
      }

      function generateStockPerformance(data) {
       if (data) {
        return `
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>Current Price</td>
                            <td>${data.currentPrice}</td>
                         </tr>
                        <tr>
                            <td>Open Price</td>
                            <td>${data.openPrice}</td>
                        </tr>
                        <tr>
                            <td>Close Price</td>
                            <td>${data.closePrice}</td>
                         </tr>
                         <tr>
                            <td>Market Cap</td>
                            <td>${data.marketCap}</td>
                         </tr>
                         <tr>
                             <td>P/E Ratio</td>
                             <td>${data.peRatio}</td>
                        </tr>
                         <tr>
                            <td>Dividend Yield</td>
                             <td>${data.dividendYield}</td>
                         </tr>
                    </tbody>
                </table>
            `;
          } else {
              return '<p> Stock not found </p>'
          }
      }

    function fetchNews() {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

      return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => data.articles)
    }

    function generateNewsFeed(articles) {
          if (!articles || articles.length === 0) {
                return '<p> No news available </p>';
            }
           let newsHTML = '<ul>';
          articles.forEach(article => {
              newsHTML += `
                <li>
                    <a href="${article.url}" target="_blank">
                       <h3>${article.title}</h3>
                    </a>
                    <p>${article.description || ''}</p>
                 </li>
               `;
          });
          newsHTML += '</ul>';
          return newsHTML;
    }

    function generateStockDetails() {
        const dummyDetails = {
             companyProfile: "Apple Inc. is a multinational technology company specializing in consumer electronics, software, and online services.",
             analystRatings: "Buy rating from major firms",
             financials: "Revenues: $380 billion, Profits: $90 billion"
        };

        return `
            <p><strong>Company Profile:</strong> ${dummyDetails.companyProfile}</p>
            <p><strong>Analyst Ratings:</strong> ${dummyDetails.analystRatings}</p>
            <p><strong>Financial Highlights:</strong> ${dummyDetails.financials}</p>
        `;
    }


    function generateMacroIndicators() {
        const dummyIndicators = {
          gdpGrowth: '2.5%',
          inflation: '4.2%',
          interestRate: '5.25%',
           oilPrice: '$75 per barrel',
             goldPrice: '$2000 per ounce'
        };

        return `
           <ul>
                <li><strong>GDP Growth:</strong> ${dummyIndicators.gdpGrowth}</li>
                <li><strong>Inflation:</strong> ${dummyIndicators.inflation}</li>
                <li><strong>Interest Rate:</strong> ${dummyIndicators.interestRate}</li>
                 <li><strong>Oil Price:</strong> ${dummyIndicators.oilPrice}</li>
                 <li><strong>Gold Price:</strong> ${dummyIndicators.goldPrice}</li>
           </ul>
        `;
    }
});
