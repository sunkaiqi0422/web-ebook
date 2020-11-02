import axios from 'axios';
// axios.defaults.timeout = 10000;
// axios.interceptors.request.use(
//   config => {
//     return config;
//   },
//   err => {
//     throw new Error(err);
//   }
// );
// axios.interceptors.response.use(
//   res => {
//     return res.data;
//   },
//   err => {
//     throw new Error(err);
//   }
// );

// export function home() {
//   return new Promise((resolve, reject) => {
//     axios.get(`${process.env.VUE_APP_BASE_URL}/book/home`).then(
//       res => {
//         resolve(res);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// }
export function shelf() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  });
}

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  });
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  });
}

export function list() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  });
}
