import { apiPostFunction } from '@/utils/requestMethod'
const tag = {
    list: 'cate/List'
}
class Service {
    static async apiTagsList(data: any){
        return apiPostFunction(tag.list, data)
    }
}
export default Service
