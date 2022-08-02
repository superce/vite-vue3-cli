import moment from 'moment'

// 前一天的时间
export const yesterdayFormDate = (day = 1, t = '') => {
    const date = moment().subtract(day, 'day').format('YYYY-MM-DD') + ' ' + t
    return date
}

/**
 * 时间格式化字符串
 * @param value {Date} 时间
 * @param type {string} 格式化类型 {''|'date'|'datetime'|'time' | 'short' | 'times'} 默认'datetime'
 * @param formatStr? {string} 自定义格式化字符串 type 为空时生效
 * @returns {string}
 */
export const dateFormat = function (value: moment.MomentInput, type: string, formatStr: string): string {
    let formatString = 'YYYY-MM-DD HH:mm:ss'
    let mDate = moment()
    if (typeof value === 'string' && value.indexOf('/') > 0) {
        mDate = moment(value, 'YYYY/MM/DD HH:mm:ss')
    } else if (typeof value === 'object') {
        mDate = moment(value, 'YYYY/MM/DD HH:mm:ss')
    }else if(typeof value === 'string' && value.indexOf('T') > 0){
        mDate = moment(value, 'YYYY/MM/DD HH:mm:ss')
    } else {
        mDate = moment(value)
    }
    if (!value || (mDate.toDate().toString() === 'Invalid Date') || mDate.isSame('2001-01-01', 'day')) {
        return '-'
    }
    if (value === '/Date(-62135596800000)/') {
        return '-'
    }
    switch (type) {
        case 'date':
            formatString = 'YYYY-MM-DD'
            break
        case 'day':
            formatString = 'MM-DD'
            break
        case 'datetime':
            formatString = 'YYYY-MM-DD HH:mm:ss'
            break
        case 'time':
            formatString = 'HH:mm:ss'
            break
        case 'short':
            formatString = 'MM-DD HH:mm'
            break
        case 'times':
            formatString = 'MM-DD HH:mm:ss'
            break
        default:
            if (formatStr) {
                formatString = formatStr
            }
            break
    }
    return mDate.format(formatString)
}
export const splitFindTime = (t: string, h: string): string => {
    if (!t) return '-'
    const st = t.split(' ')
    const date = st[0]
    const time = st[1]
    const splitDate = date.split('/')
    const y = splitDate[2]
    const m = splitDate[0]
    const d = splitDate[1]
    let datetime = ''
    if(h){
        datetime = `${y}-${m}-${d}`
    }else{
        datetime = `${y}-${m}-${d} ${time}`
    }
    return datetime
}
/**
 * 时间戳转日期显示
 * @param value {Date} 时间
 * @returns {string}
 */
export const timestampFormat = function (value: number): string {
    let formatString = 'YYYY-MM-DD HH:mm:ss'
    var mDate = moment(value * 1000)
    return mDate.format(formatString)
}

export const durFilter = function (dur: moment.MomentInput) {
    if (!dur) {
        return 0
    }
    let mDate = moment.utc(dur)
    let date = mDate.date()
    let hour = mDate.hour()
    if (mDate.date() > 1) {
        let minute = ((date - 1) * 24 * 60) + (hour * 60) + mDate.minute()
        return `${minute}:${mDate.format('ss')}`
    }
    if (hour > 0) {
        let minute = (hour * 60) + mDate.minute()
        return `${minute}:${mDate.format('ss')}`
    }
    return mDate.format('mm:ss')
}

export const numberFormat = function (value: any, defaultStr: any) {
    let v = Number(value)
    if (isNaN(v)) {
        return '-'
    }
    if (v === 0) {
        return defaultStr || '0'
    }
    if (v > 9999) {
        return Math.round(v / 1000) / 10 + 'w'
    }
    return v
}

//json日期格式转换为正常格式,有时分秒
export const jsonDateFormat = function (DateTime: string) {
    try {

        if (DateTime === '/Date(-62135596800000)/') {
            return '-'
        }

        if (DateTime != null) {
            var date = new Date(parseInt(DateTime.replace("/Date(", "").replace(")/", ""), 10));
            //月份为0-11，所以+1，月份小于10时补个0
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
            var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + sec;
        }
        return "";
    } catch (ex) {
        return "";
    }
}


export const getThisDate = function () {
    var date = new Date();
    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + sec;
}
