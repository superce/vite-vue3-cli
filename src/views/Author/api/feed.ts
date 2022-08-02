import { apiPostFunction } from '@/utils/requestMethod'

const feed = {
    list: 'Artfeed/List'
}
class Service {
    static apiArtilceFeedList(data: any) {
        return apiPostFunction(feed.list, data)
    }
}
export default Service
