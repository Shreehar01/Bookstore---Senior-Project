import axios from 'axios';



// Base URL for online deployment "https://bookstoresj.herokuapp.com/"
// Base URL for local copy: "http://localhost:5000"
const API = axios.create({baseURL: "https://bookstoresj.herokuapp.com"});

// Adding headers with authentication token to an API request.
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// User Routes 
export const SignIn = (formData) => API.post('/user/signin', formData);
export const SignUp = (formData) => API.post('/user/signup', formData);
export const Register = (registerData) => API.post('/register/registerdata', registerData);
export const UpdateInformation = (personalInformation) => API.patch('/user/updateinformation', personalInformation);

// Book Routes
export const CreateBook = (bookInformation) => API.post('/book/createbook', bookInformation);
export const GetBooks = () => API.get(`/book/getbooks`);
export const GetAllBooks = (search) => API.post(`/book/getallbooks/${search}`);
export const UpdateBook = (id, bookInfo) => API.post(`/book/updatebook/${id}`, bookInfo);
export const DeleteBook = (id) => API.delete(`/book/deletebook/${id}`);

// Request Routes
export const CreateRequest = (requestInformation) => API.post('/request/createrequest', requestInformation);
export const GetRequests = () => API.get(`/request/getrequests`);
export const UpdateRequest = (id, requestInfo) => API.post(`/request/updaterequest/${id}`, requestInfo);
export const DeleteRequest = (id) => API.delete(`/request/deleterequest/${id}`);

// Mail Routes
export const SendMail = (mailInformation) => API.post('/user/sendmail', mailInformation);
export const SendMultipleMails = (selectedBook) => API.post('/user/sendmultiplemails', selectedBook);

// Web Scraping Route
export const GetAmazonBooks = (search) => API.post(`/book/getamazonbooks/${search}`);