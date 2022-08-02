import { apiPostFunction } from '@/utils/requestMethod'
const login = {
    login: '/Sysuser/CheckLogin',
}
class Service {
    static loginUser(data: any){
        return apiPostFunction(login.login, data)
    }
}
export default Service
