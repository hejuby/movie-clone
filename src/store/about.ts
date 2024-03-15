import { Store } from "../core/core";

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repo: string
}

export default new Store<State>({
  photo: '/vite.svg',
  name: 'HEJUBY',
  email: 'hejuby@gmail.com',
  blog: 'https://velog.io/@hejuby/posts',
  github: 'https://github.com/hejuby',
  repo: '#'
});