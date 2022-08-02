import { ElMessage } from 'element-plus'
let LoadingService: any = null
export const hideLoading = () => {
    LoadingService && LoadingService.close()
}
export const successMsg = (msg: any) => {
    hideLoading()
    ElMessage({ type: 'success', message: msg, duration: 1400 })
}
export const failMsg = (err: any) => {
    if (!isCancel(err)) {
        hideLoading()
        let msg = '系統出錯'
        if ((typeof err) === 'object') {
            msg = err.msgTip || err.msg || err.message || err.Message || '系統出錯'
        } else if (typeof err === 'string') {
            msg = err
        }
        ElMessage({ type: 'error', message: msg, duration: 1400 })
    }
}
export const warningMsg = (err: any) => {
    if (!isCancel(err)) {
        hideLoading()
        let msg = '系統出錯'
        if ((typeof err) === 'object') {
            msg = err.msgTip || err.msg || err.message || err.Message || '系統出錯'
        } else if (typeof err === 'string') {
            msg = err
        }
        ElMessage({ type: 'warning', message: msg, duration: 1400 })
    }
}
export const isCancel = (e: any) => {
    return typeof e === 'string' && (e === 'cancel' || e === 'close')
}
export default {
    successMsg,
    failMsg,
    warningMsg
}
