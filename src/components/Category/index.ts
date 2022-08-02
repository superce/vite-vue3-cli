import Service from './api'
export function getCategory(param: any){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await Service.apiTagsList(param)
            resolve(res)
        }catch(err){}
    })
}
