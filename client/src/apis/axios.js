import axios from 'axios'

const url = process.env.REACT_APP_LOCALHOST

const instance = axios.create({
    baseURL:url,

  });

export default instance