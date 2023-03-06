// import './css/styles.css';
// import axios from 'axios';
// import card from '../src/templates/card.hbs'
// import Notiflix from 'notiflix';
// // https://pixabay.com/api/

// const DEBOUNCE_DELAY = 300;
// const form = document.querySelector('#search-form');
// const btn = document.querySelector('.btn');
// const gallery = document.querySelector('.gallery');


// form.addEventListener('form', debounce(onForm, DEBOUNCE_DELAY));

// async function pixabay(query, page, perPage) {
    // const response = await axios.get(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);

    // const response = await fetch(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);
    //         if (!response.ok) {
    //             throw new Error(response.statusText)
    //         }
    //         const data = await response.json()
    //         console.log(data);
    //     return data;
    // }
    // pixabay()
    //     .then(response => console.log(response))
    //     .catch(err => console.log(err.message))

//     try {
//         const response = await axios.get(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);
//         gallery.innerHTML =  card(response.data)
    
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function onForm() {
//     const name = form.value.trim()


// }
import './css/styles.css'
import { fetchImages } from './fetchimage'
import { card } from './templates/card.hbs'

import Notiflix from 'notiflix'
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.btn-load-more')
let query = ''
let page = 1
let simpleLightBox
const perPage = 40

searchForm.addEventListener('submit', onSearchForm)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)

onScroll()
onToTopBtn()

function onSearchForm(e) {
  e.preventDefault()
  window.scrollTo({ top: 0 })
  page = 1
  query = e.currentTarget.searchQuery.value.trim()
  gallery.innerHTML = ''
  loadMoreBtn.classList.add('is-hidden')

  if (query === '') {
    alertNoEmptySearch()
    return
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound()
      } else {
        card(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        alertImagesFound(data)

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden')
        }
      }
    })
    .catch(error => console.log(error))
}

function onLoadMoreBtn() {
  page += 1
  simpleLightBox.destroy()

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      card(data.hits)
      simpleLightBox = new SimpleLightbox('.gallery a').refresh()

      const totalPages = Math.ceil(data.totalHits / perPage)

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden')
        alertEndOfSearch()
      }
    })
    .catch(error => console.log(error))
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function alertNoImagesFound() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function alertEndOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}