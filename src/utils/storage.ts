
const __TokenKey = 'ARTICLE_TOKEN_WEB'
const __prefix = 'ARTICLE'
const makeName = (name: string) => {
    if (name.startsWith(__prefix)) {
        return name
    }
    return __prefix + '_' + name
}

/**
 * 设置session
 * @param name
 * @param value
 * @returns {boolean}
 *
 */
export const setSession = (name: string, value: any) => {
    if (!name || !value) {
        return false
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    name = makeName(name)
    window.sessionStorage.setItem(name, value)
}

/**
 * 获取session
 * @param name
 * @returns {*|value|*}
 */
export const getSession = (name: string) => {
    name = makeName(name)
    let value = window.sessionStorage.getItem(name)
    if (value && value.length > 0) {
        let result
        try {
            result = JSON.parse(value)
        } catch (e) {
            result = value
        }
        return result
    }
    return value
}

/**
 * 移除session
 * @param name
 */
export const removeSession = (name: string) => {
    name = makeName(name)
    window.sessionStorage.removeItem(name)
}

/**
 * 清空session
 */
export const clearSession = () => {
    window.sessionStorage.clear()
}

/**
 * 设置local存储
 * @param name
 * @param value
 * @returns {boolean}
 */
export const setLocal = (name: string, value: any) => {
    if (!name) {
        return false
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    name = makeName(name)
    window.localStorage.setItem(name, value)
}

/**
 * 获取local 存储
 * @param name
 * @returns {string|*}
 */
export const getLocal = (name: string): string | any => {
    name = makeName(name)
    let value = window.localStorage.getItem(name)
    if (value && value.length > 0) {
        let result
        try {
            result = JSON.parse(value)
        } catch (e) {
            result = value
        }
        return result
    }
    return value
}

export const getLocalBoolean = (name: string) => {
    name = makeName(name)
    let value = window.localStorage.getItem(name)
    if (value && value.length > 0) {
        let r = Number(value)
        if (isNaN(r)) {
            return !!(value)
        }
        return Boolean(r)
    }
    return true
}

/**
 * 移除local存储
 * @param name 键名
 */
export const removeLocal = (name: string) => {
    name = makeName(name)
    window.localStorage.removeItem(name)
}

/**
 * 清空local存储
 */
export const clearLocal = () => {
    Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith(__prefix)) {
            removeLocal(key)
        }
    })
}

export const setToken = (token: string) => {
    window.localStorage.setItem(__TokenKey, token)
}
export const removeToken = () => {
    window.localStorage.removeItem(__TokenKey)
}
export const getToken = () => {
    let r = checkLocalToken()
    if (r.pass) {
        return r.token
    } else {
        // Message.error(r.error.message)
        return ''
    }
}

export const getUserId = () => {
    let r = checkLocalToken()
    return r.pass ? r.data.id : ''
}
export const getUserToken = () => {
    let r = checkLocalToken()
    return r.pass ? r.data.token : 0
}
// export const getUserRole = () => {
//     let r = checkLocalToken()
//     return r.data.role
// }
/**
 * checkToken
 */
interface result {
    pass: boolean;
    error: Error;
    token: string;
    data: {
        id: string;
        username: string;
        token: string;
    };
}
 function checkLocalToken () {
    let token = window.localStorage.getItem(__TokenKey)
    let result:result = {
        pass: false,
        error: new Error(),
        token: "",
        data: {
            id: "",
            username: "",
            token: '',
        }
    };
    if (token) {
        let nowTime = Date.now()
        let payload = token.split('.')
        let dataJson = decodeURIComponent(atob(payload[1]))
        let dataObj = JSON.parse(dataJson)
        let timeout = Number(String(dataObj.exp).padEnd(13, '0'))
        if (nowTime > timeout) { // 过期
            result.error = new Error('登陆过期')
        } else {
            result.pass = true
            result.data = dataObj
            result.token = dataObj.token
        }
    } else {
        result.error = new Error('未找到Token')
    }
    return result
}

