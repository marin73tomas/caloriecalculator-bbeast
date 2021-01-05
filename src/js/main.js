import * as API from "./api.js";
import firstStepOptions from "./firstStep.js";
import secondStepOptions from "./secondStep.js";
import thirdStepOptions from "./thirdStep.js";

const stepOptions = [
  {title:'My goal is to', options: firstStepOptions()},
  {title:'In the past, I’ve had a', options: secondStepOptions()},
  {title:'My Program is', options: thirdStepOptions()},
];
let currentStepNumber = 1;

const gatheredInfo = [
  { stepNumber: 1, optionSelected: null },
  { stepNumber: 2, optionSelected: null },
  { stepNumber: 3, optionSelected: null },
  { stepNumber: 4, optionSelected: null },
];

const displayStepOptions = function (options,title=null) {
  let stepsContainer = document.querySelector("ul.options-list");
  let steps = stepsContainer.childNodes
  let theTitle = document.querySelector('h2.title-steps')
  let optionSelected = gatheredInfo[currentStepNumber - 1].optionSelected
  
  

 

 
  stepsContainer.innerHTML = "";
  if (currentStepNumber < 4) {
    options.forEach((option, idx) => {
      let newLi = document.createElement("li");

      newLi.className = "calorie-step";
      newLi.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>' + option;
      newLi.addEventListener("click", function () {
        
        steps.forEach((li) => {
          li.classList.remove("active");
        });
        this.classList.add("active");

        gatheredInfo[currentStepNumber - 1].optionSelected = idx + 1;
      });
      stepsContainer.appendChild(newLi);
    });
    theTitle.innerHTML  = title ?  title : ''
    if(optionSelected){
        
      steps[optionSelected - 1].classList.add('active')
    }
  }
  
};

const changeActiveStep = function (event) {
  let nextStepNumber;
  let isBack = event.currentTarget.innerHTML == "Back"; //the back button was pressed
  if (isBack) {
    currentStepNumber--;

    API.deactiveStepCircle(currentStepNumber + 1);
  } else {
    nextStepNumber = currentStepNumber + 1;
    API.activateStepCircle(nextStepNumber);
  }

  return new Promise((resolve, reject) => {
    if (currentStepNumber < 4) {
      if (currentStepNumber == 2) if (isBack) API.disableBackButton();
      if (isBack == false) {
        if (API.checkIfOptionIsSelected(currentStepNumber, gatheredInfo))
          resolve();
        else reject("Please select an option to continue.");
      } 
      resolve()
    } else API.disableNextButton();
  });
};

const setUpBtns = function (btn) {
  API.activateStepCircle(currentStepNumber);
  btn.addEventListener("click", (event) => {
    changeActiveStep(event)
      .then(function () {
        let isBack = event.currentTarget.innerHTML == "Back";
        
        if (isBack) gatheredInfo[currentStepNumber].optionSelected = null;
        if (!isBack) currentStepNumber++;
        displayStepOptions(stepOptions[currentStepNumber - 1].options, stepOptions[currentStepNumber - 1].title);
      })
      .catch(function (str) {
        alert(str);

        if (currentStepNumber > 0) {
          API.deactiveStepCircle(currentStepNumber + 1);
        }
      });
  });
};

async function setUpCalculator() {
  displayStepOptions(stepOptions[currentStepNumber - 1].options,stepOptions[currentStepNumber - 1].title);
  setUpBtns(API.getBackButton());
  setUpBtns(API.getNextButton());
}
setUpCalculator();
