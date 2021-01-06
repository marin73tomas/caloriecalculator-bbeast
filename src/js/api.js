export function getBackButton(){
    return  document.querySelector("#calorie-back");
}
export function getNextButton(){
    return  document.querySelector("#calorie-next");
}

export  function disableButton(btn) {
    btn.style.pointerEvents = "none";
};
export  function enableButton(btn) {
    btn.style.pointerEvents = "initial";
};

function getCurrentProgram(number) {
   
  
    switch (number) {
      case 0:
        return "12weeks";
      case 1:
        return "mass";
      case 2:
        return "xtremeshred";
      case 3:
        return "beastnation";
    }
  }
  
  export function getAgeRange() {
    return document.querySelector("#age");
  }
  export  function getWeightRange() {
    return document.querySelector("#peso");
  }
  
  export  function getHeightRange() {
    return document.querySelector("#altura");
  }
  export  function getCurrentAge() {
    return getAgeRange().value;
  }
  export  function getCurrentWeight() {
    return getWeightRange().value;
  }
  
  export  function getCurrentHeight() {
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

  export function styleRangeInputs() {
    let ranges = document.querySelectorAll('input[type="range"]');
  
    for (range of ranges) {
      range.addEventListener("input", function () {
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
export function checkIfOptionIsSelected (optionNumber,gatheredInfo) {
 
  return (
    gatheredInfo.filter(
      (item) => item.stepNumber == optionNumber && item.optionSelected
    ).length > 0
  );
};



export function activateStepCircle(stepNumber){
    
    document.querySelector(`.circle-${stepNumber}`).classList.add('active')
}
export function deactiveStepCircle (stepNumber){
    document.querySelector(`.circle-${stepNumber}`).classList.remove('active')
}


