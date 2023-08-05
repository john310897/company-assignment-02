import axios from 'axios'
import { API_PATH} from '../configs/apiPathConfig'

class RegistrationService{
    createRegistrationData(body){
        return axios.post(API_PATH+'registration',body)
    }
}
export default new RegistrationService()