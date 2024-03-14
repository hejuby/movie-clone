export class Component {
  public el;
  public state;
  public props;

  constructor(payload: any = {}) {
    const { 
      tagName = 'div', 
      state = {},
      props = {}
    } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }

  render() {}
}

const routeRender = (routes: Array<any>) => {
  if(!location.hash) history.replaceState(null, '', '/#/');

  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  const query = queryString.split('&').reduce((acc: any, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, '');

  const currentRoute = routes.find((route: any) => new RegExp(`${route.path}/?$`).test(hash));
  if (routerView) {
    routerView.innerHTML = '';
    routerView.append(new currentRoute.component().el);
  }

  window.scrollTo(0, 0);
}

export const createRouter = (routes: Array<any>) => {
  return () => {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  }
}

export class Store {
  public state: any;
  public observers: any;

  constructor(state: any) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer: Function) => observer(val));
          }
        }
      });
    }
  }

  subscribe(key: any, cb: any) {
    Array.isArray(this.observers[key])
    ? this.observers[key].push(cb)
    : this.observers[key] = [cb];
  }
}