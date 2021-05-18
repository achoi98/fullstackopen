import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const GetAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const Create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const DeleteP = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.status)
}

const ChangeNumber = newNum => {
    //console.log(newNum)
    const url = `http://localhost:3001/persons/${newNum.id}`
    const request = axios.put(url, newNum)
    return request.then(response => response.data)
}
export default {
    getAll: GetAll,
    create: Create,
    deleteP: DeleteP,
    changeN: ChangeNumber
}