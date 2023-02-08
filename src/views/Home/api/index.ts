import { apiPostFunction } from '@/utils/requestMethod'
const api = (url: string) => 'Author/' + url
const url = {
    collection: api("Collection"),

}

class Service {
    static apiCollectionAuthor(data: any) {
        return apiPostFunction(url.collection, data)
    }

}
export default Service
