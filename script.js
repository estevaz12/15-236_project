const gramsPerTon = 907185;
const milesPerKm = 0.621371;
const kmPerMile = (1 / milesPerKm);

/* Based on Jones and Kammen at
   http://carbon-calc.erg.berkeley.edu/carbon_calc.bak/ltcalc/data_and_calculations.pdf,
   we know the following on average:
        - Meat, fish, and eggs (4.52 grams of C02 per calorie)
        - Nuts (7.39 grams of C02 per calorie)
        - Dairy (4.66 grams of C02 per calorie)
        - Grains (1.47 grams of C02 per calorie)
        - Fruits and Vegetables (3.03 grams of C02 per calorie)
        - Snacks, drinks, etc. (3.73 grams of C02 per calorie)
   According to https://www.ers.usda.gov/amber-waves/2016/december/a-look-at-calorie-sources-in-the-american-diet
   we get that the breakdown of the average American diet is roughly:
        - 440 calories Meat
        - 60 calories Nuts
        - 250 calories Dairy
        - 600 calories Grains
        - 200 calories Fruits and Vegetables
        - 900 calories (Added plant based oils and sugars which go into the Snack category from above)
 */
function calcFood(vegetableCaloriesPerDay, grainCaloriesPerDay, nutsCaloriesPerDay,
                  snackCaloriesPerDay, meatCaloriesPerDay, dairyCaloriesPerDay) {
    let c02GramsPerDay = 0;
    c02GramsPerDay += meatCaloriesPerDay * 4.52
    c02GramsPerDay += nutsCaloriesPerDay * 7.39
    c02GramsPerDay += dairyCaloriesPerDay * 4.66;
    c02GramsPerDay += grainCaloriesPerDay * 1.47;
    c02GramsPerDay += vegetableCaloriesPerDay * 3.03;
    c02GramsPerDay += snackCaloriesPerDay * 3.73;
    let c02GramsPerYear = c02GramsPerDay * 365;
    return c02GramsPerYear;
}

/* Based on https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/904215/2019-ghg-conversion-factors-methodology-v01-02.pdf
   we know that:
    - Airplane: 94.9 gC02 per km (international flight)
    - Bus: 103.91 gC02e per passenger km
    - Train: 34.80 gC02e per passenger km
   Also based on https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,8%2C887%20grams%20of%20CO2
   we know that 8,887 grams CO2 emitted / gallon driven
 */
function calcTransportationCost(flightsPerYear, busMilesPerDay,
                                trainMilesPerDay, carMilesPerGallon,
                                carMilesPerDay) {
    let c02GramsPerYear = 0;
    let averageFlightDistanceMiles = 6000;
    c02GramsPerYear += flightsPerYear * averageFlightDistanceMiles * kmPerMile * 94.9;
    c02GramsPerYear += ((busMilesPerDay * 365) / milesPerKm) * 103.91;
    c02GramsPerYear += ((trainMilesPerDay * 365) / milesPerKm) * 34.8;
    c02GramsPerYear += ((carMilesPerDay * 365) / carMilesPerGallon) * 8887;
    return c02GramsPerYear;
}

