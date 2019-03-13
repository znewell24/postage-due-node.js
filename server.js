const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRate', handlePostage);

app.listen(port, function() {
    console.log('Listening to port ', port);
});

function handlePostage(request, response) {
    const weight = Number(request.query.weight);
    const type = request.query.mailType;

    const total = getPostageDue(weight, type);

    const params = {total: total};

    displayPostageDue(params, response);
}

function displayPostageDue(params, response) {
    response.render('postageDue', params);
}

function getPostageDue(weight, type) {
    type = type.toLowerCase();
    var total;

    switch(type) {
        case "stamped":
            if(weight <= 1) {
                total= 0.55;
            } if(weight <= 2 && weight > 1) {
                total= 0.70;
            } if(weight <= 3 && weight > 2) {
                total= 0.85; 
            } if(weight >= 3.5) {
                total= 1.00;
            }
            break;
        case "metered":
            if(weight <= 1) {
                total= 0.50;
            } if(weight <= 2 && weight > 1) {
                total= 0.65;
            } if(weight <= 3 && weight > 2) {
                total= 0.80; 
            } if(weight >= 3.5) {
                total= 0.95;
            }
            break;
        case "flats":
            if(weight <= 1) {
                total= 1.00;
            } if(weight <= 2 && weight > 1) {
                total= 1.15;
            } if(weight <= 3 && weight > 2) {
                total= 1.30; 
            } if(weight <= 4 && weight > 3) {
                total= 1.45;
            } if(weight <= 5 && weight > 4) {
                total= 1.60;
            } if(weight <= 6 && weight > 5) {
                total= 1.75;
            } if(weight <= 7 && weight > 6) {
                total= 1.90; 
            } if(weight >= 8 && weight > 7) {
                total= 2.05;
            } if(weight <= 9 && weight > 8) {
                total= 2.20; 
            } if(weight >= 10 && weight > 9) {
                total= 2.35;
            } if(weight >= 11 && weight > 10) {
                total= 2.50;
            } if(weight <= 12 && weight > 11) {
                total= 2.65; 
            } if(weight >= 13 && weight > 12) {
                total= 2.80;
            }
            break;
        case "retail":
            if(weight <= 4) {
                total= 3.66;
            } if(weight <= 8 && weight > 4) {
                total= 4.39;
            } if(weight <= 12 && weight > 8) {
                total= 5.19; 
            } if(weight >= 13) {
                total= 5.71;
            }
            break;
    }

    return total;
}