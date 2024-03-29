import { Component } from './core/core';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    const routerView = document.createElement('router-view');

    this.el.append(
      new Header().el,
      routerView,
      new Footer().el
    );
  }
}