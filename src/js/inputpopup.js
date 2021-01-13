import  {getAgeRange,getWeightRange,getHeightRange} from './fourStep.js'
  
function getContainerUnits(){
    return document.querySelectorAll('.container-unit')

}

function whatToReturn(type){

if(type=='height-box'){
return [
            document.querySelector('#ft-input').value,
            document.querySelector('#inch-input').value
          ]
}
return [
            document.querySelector('.swal2-input:first-child').value
          ]

}
export default function init(changeUnitsCallBack){
getContainerUnits().forEach(e =>{

e.addEventListener('click', async function(){
    let innerhtml;
    let title;
    let theClassName;
    
        if(e.id=='weight-box'){
           innerhtml =  '<input min="0" max="498" type="number" id="weight-input" class="swal2-input">' 
           title = "Enter your weight in Lbs <br> (between 0 and 498)"
        }
        else if(e.id=='height-box'){
            innerhtml =  (
                '<label for="ft-input"> <b> Feet: </b> </label>' + 
                
                '<input id="ft-input" type="number" min="3" max="7" class="swal2-input">' +
                '<br> <label for="ft-input"> <b> Inches: </b> </label>' + 
          '<input type="number" min="0" max="11" id="inch-input" class="swal2-input">'
            )
            title = `Enter your height in Feet and Inches <br> (between 3'0"" and 7'11"")`
        }
        else {
        innerhtml =  '<input type="number" min="0" max="100" id="age-input" class="swal2-input">' 
		title = "Enter your Age  <br> (between 0 and 100)"
		}
        
    
    
    const { value: formValues, isConfirmed: isAccepted } = await Swal.fire({
        title: title,
        html: innerhtml,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
           return whatToReturn(e.id)
        }
      })
      
      if (isAccepted && formValues) {
     	
       if(e.id=='height-box'){ //height
            let feet = formValues[0]
            let inch = formValues[1]
            let heightCM = Math.ceil((feet * 30.48) + (inch * 2.54))
            let heightRange =  getHeightRange()
            heightRange.value = heightCM	
			 console.log({feet,inch,heightCM})
            changeUnitsCallBack(heightRange)
       }
       else if(e.id=='weight-box') {
            let weight = formValues[0]
            let weightRange =  getWeightRange()
            weightRange.value = weight / 2.2046;
            changeUnitsCallBack(weightRange)
       }
       else{
            let age = formValues[0]
            let ageRange = getAgeRange()
            ageRange.value = age 
            changeUnitsCallBack(ageRange)
       }
      }

      
},true)


}
)
}