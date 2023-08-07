import axios from 'axios'
import { API_PATH } from '../configs/apiPathConfig'

class RegistrationService {
    getAllData() {
        return axios.get(API_PATH + 'registrations-all')
    }
    createRegistrationData(body) {
        return axios.post(API_PATH + 'registration', body)
    }
    updateRegistrationData(id, body) {
        return axios.put(API_PATH + 'registration/' + id, body)
    }
    deleteRegistrationData(id, body) {
        return axios.delete(API_PATH + 'registration/' + id, body)
    }
}
export default new RegistrationService()