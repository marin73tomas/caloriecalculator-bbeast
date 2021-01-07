import * as API from "./api.js";
import firstStepOptions from "./firstStep.js";
import secondStepOptions from "./secondStep.js";
import thirdStepOptions from "./thirdStep.js";
import * as fourStep from "./fourStep.js";

const stepOptions = [
  { title: "My goal is to", options: firstStepOptions() },
  { title: "In the past, I’ve had a", options: secondStepOptions() },
  { title: "My Program is", options: thirdStepOptions() },
  { title: null, options: null },
];
let currentStepNumber = 1;

const gatheredInfo = [
  { stepNumber: 1, optionSelected: null },
  { stepNumber: 2, optionSelected: null },
  { stepNumber: 3, optionSelected: null },
  { stepNumber: 4, optionSelected: null },
];
function displayCalories() {
  try {
    let caloriesObject = fourStep.calculate(
      gatheredInfo[1].optionSelected,
      fourStep.getCurrentAge(),
      fourStep.getCurrentWeight(),
      fourStep.getCurrentHeight()
    );

    fourStep.changeCaloriesValue(caloriesObject.calories);
    fourStep.changeCarbohydrateValue(caloriesObject.carbohydrate);
    fourStep.changeProteinsValue(caloriesObject.protein);
    fourStep.changeFatValue(caloriesObject.fat);
  } catch (Error) {
    alert(
      "Error while calculating the calories, make sure age,weight and height are not empty."
    );
  }
}
const displayStepOptions = function (options = null, title = null) {
  let stepsContainer = document.querySelector("ul.options-list");
  let steps = stepsContainer.childNodes;
  let theTitle = document.querySelector("h2.title-steps");
  let optionSelected = gatheredInfo[currentStepNumber - 1].optionSelected;

  stepsContainer.innerHTML = "";
  console.log(currentStepNumber);
  if (currentStepNumber < 4) {
    API.getNextButton().style.display = "block";
    API.getResultsButton().style.display = "none";

    options.forEach((option, idx) => {
      let newLi = document.createElement("li");

      newLi.className = "calorie-step";
      newLi.innerHTML =
        '<i class="fa fa-circle" aria-hidden="true"></i>' + option;
      newLi.addEventListener("click", function () {
        steps.forEach((li) => {
          li.classList.remove("active");
        });
        this.classList.add("active");

        gatheredInfo[currentStepNumber - 1].optionSelected = idx + 1;
      });
      stepsContainer.appendChild(newLi);
    });
    theTitle.innerHTML = title ? title : "";
    if (optionSelected) {
      steps[optionSelected - 1].classList.add("active");
    }
  } else {
    //we are on step 4
    API.getNextButton().style.display = "none";
    API.getResultsButton().style.display = "block";

    stepsContainer.innerHTML = fourStep.displayRanges();

    fourStep.setUp();
  }
};

const changeActiveStep = function (event) {
  let nextStepNumber;

  let isBack = event.currentTarget.id == "calorie-back"; //the back button was pressed
  if (isBack) {
    currentStepNumber--;

    API.deactiveStepCircle(currentStepNumber + 1);
  } else {
    nextStepNumber = currentStepNumber + 1;
    API.activateStepCircle(nextStepNumber);
  }

  return new Promise((resolve, reject) => {
    if (currentStepNumber < 3) {
      API.enableButton(API.getNextButton());
      if (currentStepNumber == 1 && isBack)
        API.disableButton(API.getBackButton());
      else if (currentStepNumber == 1) API.enableButton(API.getBackButton());
      if (isBack == false) {
        if (API.checkIfOptionIsSelected(currentStepNumber, gatheredInfo))
          resolve();
        else reject("Please select an option to continue.");
      }
      resolve();
    } else {
      API.disableButton(API.getNextButton());
      resolve();
    }
  });
};

const setUpBtns = function (btn) {
  API.activateStepCircle(currentStepNumber);
  btn.addEventListener("click", (event) => {
    changeActiveStep(event)
      .then(function () {
        let isBack = event.currentTarget.id == "calorie-back";

        if (isBack) gatheredInfo[currentStepNumber].optionSelected = null;
        if (!isBack) currentStepNumber++;
        displayStepOptions(
          stepOptions[currentStepNumber - 1].options,
          stepOptions[currentStepNumber - 1].title
        );
      })
      .catch(function (str) {
        alert(str);

        if (currentStepNumber > 0) {
          API.deactiveStepCircle(currentStepNumber + 1);
        }
      });
  });
};

async function startCalculator() {
  displayStepOptions(
    stepOptions[currentStepNumber - 1].options,
    stepOptions[currentStepNumber - 1].title
  );
  API.disableButton(API.getBackButton());
  setUpBtns(API.getBackButton());
  setUpBtns(API.getNextButton());
  API.getResultsButton().addEventListener(
    "click",
    () => {
      API.getResultsButton().style.display = "none";
      API.getResetButton().style.display = "block";

      displayCalories();
    },
    true
  );
  API.getResetButton().addEventListener(
    "click",
    () => {
      API.getResultsButton().style.display = "block";
      API.getResetButton().style.display = "none";
      fourStep.changeCaloriesValue(0)
      fourStep.changeCarbohydrateValue(0)
      fourStep.changeProteinsValue(0)
      fourStep.changeFatValue(0)

      displayStepOptions();
    },
    true
  );
}

document.addEventListener("DOMContentLoaded", function (event) {
  startCalculator();
});
