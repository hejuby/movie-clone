import { Component } from "../core/core";

export default class Header extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    });
    window.addEventListener('popstate', () => {
      this.render();
    })
  }

  render() {
    this.el.innerHTML = `
      <a href="#/" class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus.map((menu: any) => {
            const href = menu.href;
            const hash = location.hash.split('?')[0];
            const isActive = href === hash;
            return `
              <li>
                <a class="${isActive ? 'active' : ''}" href="${menu.href}"> 
                  ${menu.name}
                </a>
              </li> 
            `
          }).join('')} 
        </ul> 
      </nav>
      <a href="#/about" class="user">
        <img src="/vite.svg" alt="User" />
      </a>
    `;
  }
}