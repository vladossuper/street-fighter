import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import Fighter from './Fighter';


class FightersView extends View {
  constructor(fighters) {
    super();
    this.fighters = fighters;
    //this.fighter = fighter;
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
    //console.log(fighters);
  }
  
  fightersDetailsMap = new Map();

  getAllCheckbox() {
    return this.element.querySelectorAll('.addFighter');
  }

  createFighters(fighters, fighter) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      //console.log(fighterElements);
      return fighterView.element;
    });
    //console.log("Elements fighters");
    //console.log(fighterElements);

    const startButton = this.createElement({ 
      tagName: 'input', 
      className: 'start_fight', 
      attributes: {
        type: 'submit', 
        value: 'Fight!',
      }
    });


    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
    this.element.append(startButton);
    const view = this;
    this.fighter = fighter;

    

    startButton.addEventListener('click', startGame);


    function startGame() {

      //console.log('1');
      const checkbox = view.getAllCheckbox();
      let fighterIds = [];
      for(let i = 0; i < checkbox.length; i++) {
          if(checkbox[i].checked){
            fighterIds.push(checkbox[i].getAttribute('id'));
              if(!checkbox[i].checked) {
                  checkbox.classList.add('hide');
              }
          }
      }
      if(fighterIds.length == 2) {
        
        fighterService.getFighterDetails(fighterIds[0]).then(function(f1) {
          fighterService.getFighterDetails(fighterIds[1]).then(function(f2) {
            const all = view.element.querySelectorAll('.fighter')
            all.forEach(element => {
              const id = element.querySelector('.addFighter').getAttribute('id');
              if (!fighterIds.includes(id)) {
                element.classList.add('hide');
                const modal = document.querySelector('.modal');
                const gameTitle = document.querySelector('.gameTitle');
                modal.classList.add('hide');
                gameTitle.classList.add('hide');
              }
            });



            function fighter(fighter1, fighter2) {
              let left = 0;
              let top = 0;
              
              /*const lifeIndicator1 = document.querySelector('.life-indicator1');
              const lifeIndicator2 = document.querySelector('.life-indicator2');
              lifeIndicator1.classList.remove('hide');
              lifeIndicator2.classList.remove('hide');*/

              document.addEventListener('keydown', changePosition);

              const hit1 = new Fighter(fighter1.name, fighter1.health, fighter1.attack, fighter1.defense);
              const hit2 = new Fighter(fighter2.name, fighter2.health, fighter2.attack, fighter2.defense);
              const winnerModal = document.querySelector('.winner-modal');
              // const winnerClose = document.querySelector('.winner-close');
              // winnerClose.addEventListener('click', () => winnerModal.classList.add('hide'));
              const winnerAbout = document.querySelector('.winner-about');
              // const fighterID = document.querySelectorAll('.fighter');
              


              function changePosition() {
                //считываю элементы для того, что бы вытянуть картинки 
                const fighterHide = document.querySelectorAll('.fighter');
                const fighterHideArr = [];
                for(let i = 0; i < fighterHide.length; i++) {
                  if(!fighterHide[i].classList.contains('hide')) {
                    fighterHideArr.push(fighterHide[i]);
                  }
                }

                //console.log(fighterHideArr);

                switch(event.keyCode) {
                  case 39: //right 1 player
                      left += 10;
                      fightersBlockArr[0].style.left = left + 'px';
                    break;

                    case 37: //left 1 player
                      left -= 10;
                      fightersBlockArr[0].style.left = left + 'px';
                    break;

                    case 38: //top 1 player
                      top -= 10;
                      fightersBlockArr[0].style.top = top + 'px';
                    break;

                    case 40: //bottom 1 player
                      top += 10;
                      fightersBlockArr[0].style.top = top + 'px';
                    break;

                    case 68: //right 2 player
                      left += 10;
                      fightersBlockArr[1].style.left = left + 'px';
                    break;

                    case 65: // right 2 player
                      left -= 10;
                      fightersBlockArr[1].style.left = left + 'px';
                    break;

                    case 87:
                      top -= 10; //top 2 player
                      fightersBlockArr[1].style.top = top + 'px';
                    break;

                    case 83:
                      top += 10; //bottom 2 player
                      fightersBlockArr[1].style.top = top + 'px';
                    break; 
                }

                const life = document.querySelector('.life');
                const lifeIndicator1 = document.querySelector('.life-indicator1');
                const lifeIndicator2 = document.querySelector('.life-indicator2');
                life.classList.remove('hide');

                //const images = document.querySelectorAll('.fighter-image');
                
                
                let hitPower1 = (hit1.getHitPower() - hit2.getBlockPower());
                let hitPower2 = (hit2.getHitPower() - hit1.getBlockPower());

                if (hitPower1 <= 0) {
                  hitPower1 == 0;
                  return hitPower1;
                }
                
                if (hitPower2 <= 0) {
                  hitPower2 == 0;
                  return hitPower2;
                }

                switch(event.keyCode) {
                  case 17: 
                    fighter2.health -= hitPower1;
                    lifeIndicator2.innerText = `${fighter2.health.toFixed(0)} hp`;
                    console.log(fighter2.health);
                    fighterHideArr[1].children[0].classList.add('fighter-image-hit');
                    // fighterHideArr[1].children[0].classList.remove('fighter-image-hit');
                    fighterHideArr[0].children[0].classList.remove('fighter-image-hit');

                    break;
                    
                  case 16:
                      fighter1.health -= hitPower2;
                      lifeIndicator1.innerText = `${ fighter1.health.toFixed(0)} hp`;
                      fighterHideArr[0].children[0].classList.add('fighter-image-hit');
                      // fighterHideArr[0].children[0].classList.remove('fighter-image-hit');
                      fighterHideArr[1].children[0].classList.remove('fighter-image-hit');
                      // console.log(fighter1.health);
                    break;
                }

                const allFighters = view.element.querySelectorAll('.fighter');                
                if(fighter1.health <= 0) {
                  winnerModal.classList.remove('hide');
                  winnerAbout.innerHTML = `Win ${fighter2.name}`;
                  allFighters.forEach(el => el.classList.add('hide'));
                  document.getElementById('root').classList.remove('background-img');
                  document.getElementById('root').classList.add('background-color');
                  lifeIndicator1.classList.add('hide');
                  lifeIndicator2.classList.add('hide');
                };
                
                if(fighter2.health <= 0) {
                  winnerModal.classList.remove('hide');
                  winnerAbout.innerHTML = `Win ${fighter1.name}`;
                  allFighters.forEach(el => el.classList.add('hide'));
                  document.getElementById('root').classList.remove('background-img');
                  document.getElementById('root').classList.add('background-color');
                  lifeIndicator2.classList.add('hide');
                  lifeIndicator1.classList.add('hide');
                }; 
              }
            }

            fighter(f1, f2);

            const background = document.getElementById('root');
            background.classList.add('background-img');
            

            // fighters array and add new class for two fighters
            let fightersBlock = document.querySelectorAll('.fighter');
            const fightersBlockArr = [];
            for(let i = 0; i < fightersBlock.length; i++) {
              //console.log(fightersBlock[i].classList);
              if(fightersBlock[i].classList.length !== 2) {
                fightersBlockArr.push(fightersBlock[i]);
              }
            }
            fightersBlockArr[0].classList.add('distance-right');
            fightersBlockArr[1].classList.add('distance-right');
            fightersBlockArr[0].classList.add('distance-top');
            fightersBlockArr[1].classList.add('distance-top');



            //Mirror second image
            let secondImage = document.getElementById(fighterIds[1]);
            view.element.querySelector('.start_fight').classList.add('hide');
            //firstImage.classList.add('distance-left');
            secondImage.classList.add('mirror');
            //secondImage.classList.add('distance-right');

            // Hide Checkboxes
            const checkboxes = view.element.querySelectorAll('.addFighter');
            checkboxes.forEach(el => el.classList.add('hide'));

            // Hide Name
            const names = view.element.querySelectorAll('.name');
            names.forEach(el => el.classList.add('hide'));
          
          })
        });

      } else console.log('error');
    }
  }

  async handleFighterClick(event, fighter) {
    this.fightersDetailsMap.set(fighter._id, fighter);
    //console.log('clicked');
    
    let response = await fighterService.getFighterDetails(fighter._id);
    //console.log(response);

    const modal = document.querySelector('.modal');
    const about = document.querySelector('.about');
    const close = document.querySelector('.close');
/*
    let inputName = document.querySelector('.inputName');
    inputName.value = response.name;
    let inputHealth = document.querySelector('.inputHealth');
    inputHealth.value = response.health;
    let inputDefense = document.querySelector('.inputDefense');
    inputDefense.value = response.defense;
    let inputAttack = document.querySelector('.inputAttack');
    inputAttack.value = response.attack;
    const changeData = document.querySelector('.changeData');
    changeData.addEventListener('click', () => {
      response.name = inputName.value;
      response.health = innerHeight.value;
      response.defense = inputDefense.value;
      response.attack = inputAttack.value;
    });
*/
    modal.classList.remove('hide');



    about.innerText = `Name: ${response.name}. Health ${response.health}. Defense ${response.defense}. Attack ${response.attack}`;

    close.addEventListener('click', () => modal.classList.add('hide'));

    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  }
  
}

export default FightersView;