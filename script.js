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
function calcFood(vegetableFruitPercent, grainPercent, nutsPercent,
                  snackPercent, meatPercent, dairyPercent, caloriesPerDay) {
    let totalPercent = vegetableFruitPercent + grainPercent + nutsPercent +
                       snackPercent + meatPercent + dairyPercent;
    let vegetableFruitCaloriesPerDay = (vegetableFruitPercent / totalPercent) * caloriesPerDay;
    let meatCaloriesPerDay = (meatPercent / totalPercent) * caloriesPerDay;
    let dairyCaloriesPerDay = (dairyPercent / totalPercent) * caloriesPerDay;
    let grainCaloriesPerDay = (grainPercent / totalPercent) * caloriesPerDay;
    let nutsCaloriesPerDay = (nutsPercent / totalPercent) * caloriesPerDay;
    let snackCaloriesPerDay = (snackPercent / totalPercent) * caloriesPerDay;
    let c02GramsPerDay = 0;
    c02GramsPerDay += meatCaloriesPerDay * 4.52
    c02GramsPerDay += nutsCaloriesPerDay * 7.39
    c02GramsPerDay += dairyCaloriesPerDay * 4.66;
    c02GramsPerDay += grainCaloriesPerDay * 1.47;
    c02GramsPerDay += vegetableFruitCaloriesPerDay * 3.03;
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


function directHouseEms(dollars) {
  const emFactor = 682; // g/$
  return dollars * emFactor;
}

function indirectHouseEms(state) { //NOTE: a little inefficient
  let consumptions = {"Connecticut": 689, "Maine": 562, "Massachusetts": 574,
  "New Hampshire": 599, "Rhode Island": 560, "Vermont": 549, "New Jersey": 663,
  "New York": 577, "Pennsylvania": 837, "Illinois": 709, "Indiana": 960,
  "Michigan": 637, "Ohio": 874, "Wisconsin": 674, "Iowa": 867, "Kansas": 891,
  "Minnesota": 759, "Missouri": 1058, "Nebraska": 1004, "North Dakota": 1109,
  "South Dakota": 1044, "Delaware": 950, "District of Columbia": 752,
  "Florida": 1108, "Georgia": 1121, "Maryland": 975, "North Carolina": 1079,
  "South Carolina": 1114, "Virginia": 1122, "West Virginia": 1084,
  "Alabama": 1201, "Kentucky": 1112, "Mississippi": 1206, "Tennessee": 1217,
  "Arkansas": 1118, "Louisiana": 1232, "Oklahoma": 1116, "Texas": 1140,
  "Arizona": 1014, "Colorado": 682, "Idaho": 949, "Montana": 857,
  "Nevada": 890, "New Mexico": 640, "Utah": 727, "Wyoming": 864,
  "California": 532, "Oregon": 911, "Washington": 973, "Alaska": 555,
  "Hawaii": 525, "United States": 887};
  let impacts = {"Alaska": 1375.109, "Alabama": 1284.902, "Arkansas": 1569.596,
  "Arizona": 1426.414, "California": 828.446, "Colorado": 1758.347,
  "Connecticut": 840.995, "District of Columbia": 840.310, "Delaware": 719.562,
  "Florida": 1014.673, "Georgia": 1265.963, "Hawaii": 1720.079,
  "Iowa": 1781.354, "Idaho": 800.591, "Illinois": 1886.206,
  "Indiana": 1750.667, "Kansas": 2219.947, "Kentucky": 1893.401,
  "Louisiana": 977.082, "Massachusetts": 963.737, "Maryland": 1376.112,
  "Maine": 498.952, "Michigan": 1538.390, "Minnesota": 1634.383,
  "Missouri": 1974.734, "Mississippi": 1011.486, "Montana": 2280.744,
  "North Carolina": 1361.928, "North Dakota": 2226.141, "Nebraska": 2169.050,
  "New Hampshire": 884.163, "New Jersey": 895.225, "New Mexico": 1748.001,
  "Nevada": 1031.220, "New York": 967.731, "Ohio": 1486.322,
  "Oklahoma": 1195.231, "Oregon": 1011.478, "Pennsylvania": 1245.582,
  "Rhode Island": 882.900, "South Carolina": 1314.195,
  "South Dakota": 1878.510, "Tennessee": 1581.154, "Texas": 1252.145,
  "Utah": 1793.493, "Virginia": 933.325, "Vermont": 274.245,
  "Washington": 1281.442, "Wisconsin": 1612.155, "West Virginia": 2052.382,
  "Wyoming": 2368.877, "United States": 1381.591};
  consumptions[state] = consumptions[state] * 12.0 / 1000.0;
  console.log("consumption: " + consumptions[state] + "MWh/year");
  impacts[state] = impacts[state] * consumptions[state] / 2204.62 * 1000000; // conversion to metric ton
  return impacts[state];
}

function wasteEms(recycled, dollars) { // how much recycled in TONS, need amount spent on waste
  const emFactor = 4121.0;
  const totalWasteEms = dollars * emFactor; // amount spent on waste
  const saveConst = 1308.6; // kg/ton RECYCLED
  const savings = recycled * saveConst;
  return totalWasteEms - savings;
}
