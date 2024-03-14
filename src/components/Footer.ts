import { Component } from "../core/core";
import aboutStore from '../store/about';

export default class Footer extends Component {
  constructor() {
    super({
      tagName: 'footer'
    });
  }

  render() {
    const { repo, github } = aboutStore.state;
    this.el.innerHTML = `
      <div>
        <a href="${repo}">Github Repository</a> 
      </div> 
      <div>
        <a href="${github}">${new Date().getFullYear()}</a> 
      </div>
    `;
  }
}