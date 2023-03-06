import './css/styles.css';
import axios from 'axios';
import card from '../src/templates/card.hbs'
import Notiflix from 'notiflix';
// https://pixabay.com/api/

const DEBOUNCE_DELAY = 300;
const form = document.querySelector('#search-form');
const btn = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');


form.addEventListener('form', debounce(onForm, DEBOUNCE_DELAY));
async function pixabay() {
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

    try {
        const response = await axios.get(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);
        gallery.innerHTML =  card(response.data)
    
    } catch (err) {
        console.log(err)
    }
}
async function onForm() {
    const name = form.value.trim()


}