import { Component } from "../core/core";
import movieStore from '../store/movie';
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    movieStore.subscribe('movies', () => {
      this.render();
    })
    movieStore.subscribe('loading', () => {
      this.render();
    })
    movieStore.subscribe('message', () => {
      this.render();
    })
  }
  render() {
    this.el.classList.add('movie-list');
    this.el.innerHTML = `
      ${movieStore.state.message
        ? `<div class="message">${movieStore.state.message}</div>`
        : '<div class="movies"></div>'}   
      <div class="loader hide"></div>
    `;

    const moviesEl = this.el.querySelector('.movies');
    if (movieStore.state.movies.length) {
      moviesEl?.append(
        ...movieStore.state.movies.map((movie: any) => new MovieItem({ movie }).el)
      );
    }

    const loaderEl = this.el.querySelector('.loader');
    movieStore.state.loading
      ? loaderEl?.classList.remove('hide')
      : loaderEl?.classList.add('hide');
  }
}