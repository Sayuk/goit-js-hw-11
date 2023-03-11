import './css/styles.css'
// import { fetchImages } from './js/fetch-images'
// import { renderGallery } from './js/render-gallery'
// import { onScroll, onToTopBtn } from './js/scroll'
import { card } from './templates/card'
import { fetchImages } from './fetchimage'
import { onScroll, onToTopBtn } from './scroll'

// all modules
import Notiflix from 'notiflix';

// one by one
import { Notiflix } from 'notiflix/build/notiflix-notify-aio';

// import Notiflix from 'notiflix'
// import SimpleLightbox from "simplelightbox"
// import "simplelightbox/dist/simple-lightbox.min.css"
import SimpleLightbox from "../node_modules/simplelightbox/dist/simple-lightbox.esm";


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
    .catch(err => console.log(err))
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
    // .catch(error => console.log(error))
  .catch(err => console.log(err))
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function alertNoImagesFound() {
 Notiflix.Notify.success('Sorry, there are no images matching your search query. Please try again.')
}

function alertEndOfSearch() {
  Notiflix.Notify.success("We're sorry, but you've reached the end of search results.")
}