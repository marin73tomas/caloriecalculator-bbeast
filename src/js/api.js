export function getBackButton(){
    return  document.querySelector("#calorie-back");
}
export function getNextButton(){
    return  document.querySelector("#calorie-next");
}

export  function disableBackButton() {
    getBackButton().style.disabled = true;
};

export function disableNextButton  () {
    getNextButton().style.disabled = true;
};

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


