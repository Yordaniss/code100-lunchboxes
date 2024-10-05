const fs = require('fs');

const data = fs.readFileSync('./lunchboxes.json', { encoding: 'utf8', flag: 'r' });
const parsedData = JSON.parse(data);

let childrenWithoutVeggies = 0;
let childrenWithDessert = 0;
let namesWithPreparedFood = [];
let averageAgeWithPreparedFoodSum = 0;

const vegetables = [...parsedData.boxoptions['Vegetables']];
const desserts = [...parsedData.boxoptions['Sweets & Desserts']];
const preparedFood = [...parsedData.boxoptions['Prepared Foods']];

for (let lunchbox of parsedData.lunchboxes) {
    let haveVegetables = false;
    let skipDessert = false;
    let skipPreparedFood = false;

    for (let meal of lunchbox.box) {
        if (vegetables.includes(meal) && !haveVegetables) {
            haveVegetables = true;
        }

        if (desserts.includes(meal) && !skipDessert) {
            skipDessert = true;
            childrenWithDessert++
        }

        if (preparedFood.includes(meal) && !skipPreparedFood) {
            skipPreparedFood = true;
            namesWithPreparedFood.push(lunchbox.name);
            averageAgeWithPreparedFoodSum += lunchbox.age;
        }
    }

    if (!haveVegetables) {
        childrenWithoutVeggies++;
    }
}

const result = JSON.stringify({
    'childrenWithoutVeggies': childrenWithoutVeggies, 
    'childrenWithDessert' : childrenWithDessert, 
    'namesWithPreparedFood' : namesWithPreparedFood, 
    'averageAgeWithPreparedFood' : averageAgeWithPreparedFoodSum / namesWithPreparedFood.length
});

console.log(result);
return result;