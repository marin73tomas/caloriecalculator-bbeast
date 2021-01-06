
  
  
  
  

  
  function calculate() {
    let program = getCurrentProgram();
    let age = getCurrentAge();
    let weight = getCurrentWeight();
    let height = getCurrentHeight();
    let factor = getFactor(weight);
  
    let calories = (10 * weight + 6.25 * height - 10 * age + 5) * factor;
  
    switch (program) {
      case "12weeks":
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case "mass":
        calories += 300;
        return {
          carbohydrate: Math.trunc((calories * 0.4) / 4),
          protein: Math.trunc((calories * 0.4) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case "xtremeshred":
        calories -= 300;
        return {
          carbohydrate: Math.trunc((calories * 0.2) / 4),
          protein: Math.trunc((calories * 0.5) / 4),
          fat: Math.trunc((calories * 0.3) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case "beastnation":
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
    }
  }
  
  function cmToFeetInches(height) {
    let feet = Math.trunc(height / 30.48);
    let inches = Math.trunc((height % 30.48) / 2.54);
  
    return feet + "'" + inches + '"';
  }
  function feetInchesToCm(height){
      var feet = height.split("'")[0]*30.48;
    var inches = height.split("'")[1].split('"')[0]*2.54;
    
    return Math.trunc(feet + inches);
  }
  function kgsToLbs(weight) {
    return Math.trunc(weight * 2.20462);
  }
  function lbsToKg(weight) {	
    return Math.trunc(weight/2.20462)
  }
  function changeCaloriesValue(val) {
    let total = document.querySelector("#total");
    total.innerHTML = val + " calories";
  }
  function changeCarbohydrateValue(val) {
    let carbo = document.querySelector("#carbo");
    carbo.innerHTML = val + " grams";
  }
  function changeProteinsValue(val) {
    let protein = document.querySelector("#protein");
    protein.innerHTML = val + " grams";
  }
  function changeFatValue(val) {
    let protein = document.querySelector("#fat");
    fat.innerHTML = val + " grams";
  }
  
  function displayCalories() {
    let caloriesObject = calculate();
  
    changeCaloriesValue(caloriesObject.calories);
    changeCarbohydrateValue(caloriesObject.carbohydrate);
    changeProteinsValue(caloriesObject.protein);
    changeFatValue(caloriesObject.fat);
  }
  
  function updateRangeValue(element) {
    let calculator = element.previousElementSibling;
    let currentUnit = getCurrentUnit();
  
    let calcValue = calculator.querySelector(".value");
    let calcUnit = calculator.querySelector(".unit");
    let name = element.previousElementSibling.firstChild.nodeValue; //label of the range
    name = name.toLowerCase().trim();
  
    switch (name) {
      case "weight":
        if (currentUnit == "Imperial") {
          calcValue.innerHTML = Math.trunc(kgsToLbs(element.value));
          calcUnit.innerHTML = " Lbs";
        } else {
          calcValue.innerHTML = Math.trunc(element.value);
          calcUnit.innerHTML = " kg";
        }
        break;
      case "height":
        if (currentUnit == "Imperial") {
          calcValue.innerHTML = cmToFeetInches(element.value);
          calcUnit.innerHTML = "";
        } else {
          calcValue.innerHTML = Math.trunc(element.value);
          calcUnit.innerHTML = " cm";
        }
        break;
      case "age":
        calcValue.innerHTML = Math.trunc(element.value);
        calcUnit.innerHTML = "";
        break;
    }
  }
  
  function setUpRange(element) {
    element.addEventListener("input", function () {
      updateRangeValue(this);
    });
  }
  
  function resetUnitButtons(units) {
    for (let un of units) {
      un.classList.remove("seleccion");
    }
  }
  
  function setUpUnitButtons() {
    let units = document.querySelectorAll("#units-container span");
    for (let un of units) {
      un.onclick = function () {
        resetUnitButtons(units);
        this.classList.add("seleccion");
        updateRangeValue(getAgeRange());
        updateRangeValue(getWeightRange());
        updateRangeValue(getHeightRange());
      };
    }
    document.querySelector("#units-container span:first-child").click();
  }
  
  function setUpRanges() {
    setUpRange(getAgeRange());
    setUpRange(getWeightRange());
    setUpRange(getHeightRange());
  }
  
 export function setUp() {
    setUpUnitButtons();
    setUpRanges();
    styleRangeInputs();
    document.addEventListener("input", displayCalories, false);
  }
 export function displayRanges(){
    return "<p class='calculator'>Age <span class='unit'> </span>  <span class='value' style=' font-weight:bold'> </span>  </p><input class='range' type='range' min='0' max='100' id='age' value='0'><p class='calculator'>Weight <span class='unit'> </span> <span  class='value' style=' font-weight:bold'></span> </p><input type='range' min='23' max='226' id='peso' value='23' class='range2' step='0.1'> <p class='calculator'>Height <span class='unit'> </span><span  class='value' style=' font-weight:bold'></span> </p><input type='range' min='92' max='243' id='altura' value='92' class='range3'>"

 }
  