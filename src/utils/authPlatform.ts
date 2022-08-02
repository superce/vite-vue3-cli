export const platformId = [
    {id: 'weixin', platform: "微信"},
    {id: 'baijia', platform: '百家号'},
    {id: 'toutiao', platform: '头条'}
]

export function platformName(pId: string){
    switch(pId){
        case 'weixin':
            return '微信'
        case 'baijia':
            return '百家号'
        case 'toutiao':
            return '头条'
    }
}
