// Import required modules
const express = require('express'); 
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/result', (req, res) => {
    const weight = req.body.weight;
    const height = req.body.height / 100;
    let bmi = (weight / (height ** 2)).toFixed(1) //BMI calculation
    let result = ""

    //Result calculation
    if(bmi < 18.5){ 
        result = "Underweight"
    }
    else if(bmi >= 18.5 && bmi <= 24.9){
        result = "Normal weight"
    }
    else if(bmi >= 25 && bmi <= 29.9){
        result = "Overweight"
    }
    else{
        result= "Obesity"
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>BMI calculator</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>BMI calculator</h1>
            <p>Your BMI is: <strong>${bmi}</strong></p>
            <p>It is: <strong>${result}</strong></p>
            <a href="/">Go back</a> 
        </body>
        </html>
    `);
});

// Start the server
const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
