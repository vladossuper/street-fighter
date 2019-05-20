import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source} = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source, fighter._id);
    const inputElement = this.createInput(fighter._id);


    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement, inputElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source, fighterId) {
    const attributes = { src: source, id: fighterId };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  
  createInput(fighterId) {
    const attributes = { type: "checkbox", id: fighterId};
    const inputElement = this.createElement({
      tagName: 'input',
      className: 'addFighter',
      attributes
    });

    return inputElement;
  }
}

export default FighterView;