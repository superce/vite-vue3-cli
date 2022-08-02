import { apiPostFunction } from '@/utils/requestMethod'

const article = {
    list: 'AuthorArticle/list',
    reset: "AuthorArticle/ResetState"
}
const feed = {
    list: 'Artfeed/List'
}
class Service {
    static apiCollectionAuthor(data: any) {
        return apiPostFunction(article.list, data)
    }
    static apiReset(data: any) {
        return apiPostFunction(article.reset, data)
    }
    static apiArtilceFeedList(data: any) {
        return apiPostFunction(feed.list, data)
    }
}
export default Service
