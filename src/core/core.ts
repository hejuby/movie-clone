interface ComponentPayload {
  tagName?: string
  state?: {
    [key: string]: unknown
  }
  props?: {
    [key: string]: unknown
  }
}

export class Component {
  public el;
  public state;
  public props;

  constructor(payload: ComponentPayload = {}) {
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

interface Route {
  path: string
  component: typeof Component
}
type Routes = Route[];

const routeRender = (routes: Routes) => {
  if(!location.hash) history.replaceState(null, '', '/#/');

  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  interface Query {
    [key: string]: string
  }

  const query = queryString.split('&').reduce((acc: Query, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, '');

  const currentRoute = routes.find((route: any) => new RegExp(`${route.path}/?$`).test(hash));
  if (routerView) {
    routerView.innerHTML = '';
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  window.scrollTo(0, 0);
}

export const createRouter = (routes: Routes) => {
  return () => {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  }
}

interface StoreObservers {
  [key: string]: SubscribeCallback[]
}
interface SubscribeCallback {
  (arg: unknown): void
}

export class Store<S> {
  public state = {} as S;
  private observers = {} as StoreObservers;

  constructor(state: S) {
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

  subscribe(key: string, cb: SubscribeCallback) {
    Array.isArray(this.observers[key])
    ? this.observers[key].push(cb)
    : this.observers[key] = [cb];
  }
}