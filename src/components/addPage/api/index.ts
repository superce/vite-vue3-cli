import request from '@/utils/request';
const page = {   
    add: '/authorpage/addpage'   
}
const apiFunction = async (url:string, data: any) => {
    const res = await request({ url, method: 'POST',json: true, data });
    if (res.error_code === 0) {
        return Promise.resolve(res);
    }
    return Promise.reject(res);
}
class Service {
    static apiAdd(data: any){
        return apiFunction(page.add, data)
    }
}
export default Service