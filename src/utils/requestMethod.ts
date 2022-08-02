import request from './request';
import tip from './Tip'

export const apiPostFunction = async (url: string, data?: any) => {
    const res = await request({url, method: 'post', json: true, data});
    if (res.StatusCode === 200) {
        return Promise.resolve(res);
    }
    tip.warningMsg(res.Message)
    return Promise.reject(res);
}
export const apiGetFunction = async (url: string, params?: any) => {
    const res = await request({url, method: 'get', json: true, params});
    if (res.StatusCode === 200) {
        return Promise.resolve(res);
    }
    tip.warningMsg(res.Message)
    return Promise.reject(res);
}
