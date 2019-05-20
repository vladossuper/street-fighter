import { fighterService } from "./services/fightersService";


//import fighterService from './services/fightersService';

//const fighter1 = fighterService.getFighterDetails(fighter._id)
/*function addFighters() {
    const checkbox = document.querySelectorAll('.addFighter');
    let checkboxArr = [];
    for(let i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked){
            checkboxArr.push(checkbox[i].checked);
            if(!checkbox[i].checked) {
                checkbox.classList.add('hide');
            }
        }
    }
    return checkboxArr;
}*/



let allFighter
let responseFighters1 = await fighterService.getFighterDetails(fighter._id);
//let responseFighters2 = await fighterService.getFighterDetails(fighter._id);    

function fight(fighter1, fighter2) {

    const fighter = document.querySelector('.fighter');
    fighter.classList.add('hide');

    console.log('button was pressed');
}

const button = document.querySelector('.startGame');
button.addEventListener('click', fight);




