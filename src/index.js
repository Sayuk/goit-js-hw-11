import './css/styles.css';
import Notiflix from 'notiflix';
// https://pixabay.com/api/

const DEBOUNCE_DELAY = 300;
const countryForm = document.querySelector('#search-form');
const btn = document.querySelector('.btn');


async function pixabay(){
   
        const response = await fetch(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()
        console.log(data);
    return data;
}
pixabay()
    .then(response => console.log(response))
    .catch(err => console.log(err))