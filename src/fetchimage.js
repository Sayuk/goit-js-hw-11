import axios from 'axios'
export { fetchImages }



async function fetchImages(query, page, perPage) {
  const response = await axios.get(`https://pixabay.com/api/?key=34023502-430bec32b806d37b8bfdc9ad2&q&image_typ=photo&orientation=horizontal&safesearch=true`);
  return response
}