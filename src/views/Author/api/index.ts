import { apiPostFunction } from '@/utils/requestMethod'
const api = (url: string) => 'Author/' + url
const author = {
    collection: api("Collection"),
    list: api("List"),
    add: api('add'),
    state: api('changeState'),
    editCate: api('EditCate'),
    editDomain: api('EditDomain')
}
const cate = {
    list: 'cate/list'
}
const domainid = {
    list: 'domain/list'
}
const page = {
    search: '/FBPage/FbpageList', //查询单条专页
    bind: '/Author/BindPageId', //绑定专页
    bound: 'FBPage/GetFbpage', //已经绑定的专页
}
class Service {
    static apiCollectionAuthor(data: any) {
        return apiPostFunction(author.collection, data)
    }
    static apiListAuthor(data: any) {
        return apiPostFunction(author.list, data)
    }
    static apiAddAuthor(data: any) {
        return apiPostFunction(author.add, data)
    }
    static apiChangeStateAuthor(data: any) {
        return apiPostFunction(author.state, data)
    }
    static apiCateList(data: any) {
        return apiPostFunction(cate.list, data)
    }
    static apiEditCate(data: any) {
        return apiPostFunction(author.editCate, data)
    }
    static apiDomainList(data: any) {
        return apiPostFunction(domainid.list, data)
    }
    static apiEditDomain(data: any) {
        return apiPostFunction(author.editDomain, data)
    }
    static apiSearchListItem(data: any) {
        return apiPostFunction(page.search, data)
    }
    static apiBindPage(data: any) {
        return apiPostFunction(page.bind, data)
    }
    static apiBoundPage(data: any) {
        return apiPostFunction(page.bound, data)
    }
}
export default Service
