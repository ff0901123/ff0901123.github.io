document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.getElementById('searchButton');
    const stockPerformance = document.getElementById('stockPerformance');
    const newsFeed = document.getElementById('newsFeed');
    const stockDetails = document.getElementById('stockDetails');
    const macroIndicators = document.getElementById('macroIndicators');

    searchButton.addEventListener('click', function() {
        const stockSymbol = document.getElementById('stockSymbol').value;
      if (stockSymbol) {
          stockPerformance.innerHTML = generateStockPerformance(stockSymbol);
        } else {
           stockPerformance.innerHTML = '<p> Please enter a stock symbol </p>';
        }
    });

    newsFeed.innerHTML = generateNewsFeed();
    stockDetails.innerHTML = generateStockDetails();
    macroIndicators.innerHTML = generateMacroIndicators();

   function generateStockPerformance(stockSymbol) {
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
      const data = dummyData[stockSymbol.toUpperCase()]
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

    function generateNewsFeed() {
        const dummyNews = [
            {
                title: "Tech Stocks Surge on Positive Earnings",
                summary: "Major tech companies reported higher-than-expected earnings, leading to a market rally."
            },
            {
                title: "Inflation Concerns Rise as CPI Jumps",
                summary: "Consumer Price Index data showed a significant increase, raising concerns about potential rate hikes."
            },
           {
                title: "Global Supply Chain Disruptions Impact Manufacturing Sector",
                summary: "Ongoing supply chain issues continue to affect production and delivery times for several manufacturers."
            }
        ];

        let newsHTML = '<ul>';
        dummyNews.forEach(article => {
            newsHTML += `<li><h3>${article.title}</h3><p>${article.summary}</p></li>`;
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
