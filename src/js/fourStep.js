export function styleRangeInputs() {
    let ranges = document.querySelectorAll('input[type="range"]');
  
    for (let range of ranges) {
      range.addEventListener("input",  function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
          "linear-gradient(to right, gray 0%, gray " +
          value +
          "%,  #EEEEEE " +
          value +
          "%, #EEEEEE 100%)";
      });
    }
  }
  
  export function getCurrentUnit() {
    return document.querySelector("#units-container .seleccion").innerText;
  }
  

  
  export function getAgeRange() {
    return document.querySelector("#age");
  }
  export function getWeightRange() {
    return document.querySelector("#peso");
  }
  
  export function getHeightRange() {
    return document.querySelector("#altura");
  }
  export function getCurrentAge() {
    return getAgeRange().value;
  }
  export function getCurrentWeight() {
    return getWeightRange().value;
  }
  
  export function getCurrentHeight() {
    return getHeightRange().value;
  }
  export function getFactor(weight) {
    let factor = 1;
    let lbs = kgsToLbs(weight);
  
    if (lbs < 165) factor = 1.6;
    else if (lbs > 165 && lbs <= 200) factor = 1.4;
    else if (lbs > 200 && lbs <= 220) factor = 1.2;
    else factor = 1;
  
    return factor;
  }
  
  export function calculate(program,age,weight,height) {
    
    let factor = getFactor(weight);
  
    let calories = (10 * weight + 6.25 * height - 10 * age + 5) * factor;
  
    switch (program) {
      case 1: //"12weeks"
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 2: //"mass"
        calories += 300;
        return {
          carbohydrate: Math.trunc((calories * 0.4) / 4),
          protein: Math.trunc((calories * 0.4) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 3: //"xtremeshred"
        calories -= 300;
        return {
          carbohydrate: Math.trunc((calories * 0.2) / 4),
          protein: Math.trunc((calories * 0.5) / 4),
          fat: Math.trunc((calories * 0.3) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 4: //"beastnation"
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
    }
  }
  
  export function cmToFeetInches(height) {
    let feet = Math.trunc(height / 30.48);
    let inches = Math.trunc((height % 30.48) / 2.54);
  
    return feet + "'" + inches + '"';
  }
  export function feetInchesToCm(height){
      var feet = height.split("'")[0]*30.48;
    var inches = height.split("'")[1].split('"')[0]*2.54;
    
    return Math.trunc(feet + inches);
  }
  export function kgsToLbs(weight) {
    return Math.trunc(weight * 2.20462);
  }
  export function lbsToKg(weight) {	
    return Math.trunc(weight/2.20462)
  }
  export function changeCaloriesValue(val) {
    let total = document.querySelector("#total");
    total.innerHTML = val + " calories";
  }
  export function changeCarbohydrateValue(val) {
    let carbo = document.querySelector("#carbo");
    carbo.innerHTML = val + " grams";
  }
  export function changeProteinsValue(val) {
    let protein = document.querySelector("#protein");
    protein.innerHTML = val + " grams";
  }
  export function changeFatValue(val) {
    let protein = document.querySelector("#fat");
    fat.innerHTML = val + " grams";
  }

  
  
  
  export function updateRangeValue(element) {
    let calculator = element.previousElementSibling;
    //let currentUnit = getCurrentUnit();
    let currentUnit = 'Imperial'
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
  
  export function setUpRange(element) {
    element.addEventListener("input", function () {
      updateRangeValue(this);
    });
  }
  
  export function resetUnitButtons(units) {
    for (let un of units) {
      un.classList.remove("seleccion");
    }
  }
  
  export function setUpUnitButtons() {
    let units = document.querySelectorAll("#units-container span");
    for (let un of units) {
      un.onclick =  function () {
        resetUnitButtons(units);
        this.classList.add("seleccion");
        updateRangeValue(getAgeRange());
        updateRangeValue(getWeightRange());
        updateRangeValue(getHeightRange());
      };
    }
    document.querySelector("#units-container span:first-child").click();
  }
  
  export function setUpRanges() {
    setUpRange(getAgeRange());
    setUpRange(getWeightRange());
    setUpRange(getHeightRange());
  }
  
export function setUp(program,age,weight,height) {
   
    setUpRanges();
    styleRangeInputs();
   
  }
 export function displayRanges(){
    return "<form id='reset-form'> <p class='calculator'>Age <span class='unit'> </span>  <span class='value' style=' font-weight:bold'> </span>  </p><input class='range' type='range' min='0' max='100' id='age' value='0'><p class='calculator'>Weight <span class='unit'> </span> <span  class='value' style=' font-weight:bold'></span> </p><input type='range' min='23' max='226' id='peso' value='23' class='range2' step='0.1'> <p class='calculator'>Height <span class='unit'> </span><span  class='value' style=' font-weight:bold'></span> </p><input type='range' min='92' max='243' id='altura' value='92' class='range3'> </form>"

 }
  