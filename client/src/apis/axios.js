import axios from 'axios'

const url = process.env.REACT_APP_LOCALHOST

console.log('url',url)
const instance = axios.create({
    baseURL:url,

  });

export default instance