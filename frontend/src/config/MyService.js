import axios from 'axios'
 import { MAIN_URL } from './Url'
 let token=localStorage.getItem('_token');
export function addUser(formData){
    console.log(formData);
    return axios.post(`${MAIN_URL}adduser`,formData);
}
export function login(data){
    return axios.post(`${MAIN_URL}login`,data);
}
export function getBlog(email) {
    return axios.get(`${MAIN_URL}getblog/${email}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    )}
export function getAllBlog() {
    return axios.get(`${MAIN_URL}getallblog`);
}
export function editBlog(data,id) {
    console.log(id);
    return axios.post(`${MAIN_URL}editblog/${id}`, data);
}
export function createBlog(formData) {
    console.log(formData)
    return axios.post(`${MAIN_URL}addblog`,
    // {headers:{"Authorization":`Bearer ${token}`}},
 formData);
}
export function uploadFile(data) {
    return axios.post(`${MAIN_URL}file/upload`,data);
}
export function authentication(token) {
    return axios.get(`${MAIN_URL}loginfirst`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}
export function getSingleBlog(data) {
    return axios.get(`${MAIN_URL}singleblog/` + data);

}
