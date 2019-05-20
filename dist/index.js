"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');
const fightersDetailsMap = new Map();

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };
  return fetch(url, options).then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load'))).catch(error => {
    throw error;
  });
}

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
      const apiResult = await callApi(endpoint, 'GET');
      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

}

const fighterService = new FighterService();

class View {
  constructor() {
    _defineProperty(this, "element", void 0);
  }

  createElement({
    tagName,
    className = '',
    attributes = {}
  }) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    return element;
  }

}

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();
    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const {
      name,
      source
    } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    this.element = this.createElement({
      tagName: 'div',
      className: 'fighter'
    });
    this.element.append(imageElement, nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    });
    nameElement.innerText = name;
    return nameElement;
  }

  createImage(source) {
    const attributes = {
      src: source
    };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });
    return imgElement;
  }

}

class FightersView extends View {
  constructor(fighters) {
    super();

    _defineProperty(this, "fightersDetailsMap", new Map());

    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });
    this.element = this.createElement({
      tagName: 'div',
      className: 'fighters'
    });
    this.element.append(...fighterElements);
  }

  handleFighterClick(event, fighter) {
    this.fightersDetailsMap.set(fighter._id, fighter);
    console.log('clicked'); // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  }

}

class App {
  constructor() {
    this.startApp();
  }

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;
      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }

}

_defineProperty(App, "rootElement", document.getElementById('root'));

_defineProperty(App, "loadingElement", document.getElementById('loading-overlay'));

new App();