export function getBackButton(){
    return  document.querySelector("#calorie-back");
}
export function getNextButton(){
    return  document.querySelector("#calorie-next");
}
export function getResultsButton(){
    return  document.querySelector("#calorie-results");
}
export function getResetButton(){
    return  document.querySelector("#calorie-reset");
}

export  function disableButton(btn) {
    btn.style.pointerEvents = "none";
};
export  function enableButton(btn) {
    btn.style.pointerEvents = "initial";
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