import settingStateTypes from './modules/Setting/types';
import appStateTypes from './modules/app/types';
import tabStateTypes from './modules/tabs/types'
import messageStateTypes from './modules/message/types';
import tagTypes from './modules/tag/types';
import loginTypes from './modules/Login/types';
export default interface RootStateTypes {
  count: Number
  // eslint-disable-next-line semi
}

export interface AllStateTypes extends RootStateTypes {
  settingsModule: settingStateTypes,
  appModule: appStateTypes,
  messageModuel:messageStateTypes,
  tabModule:tabStateTypes
  tagModule: tagTypes
  loginModule: loginTypes
}
