import { TokenExpiredTime } from './constants';

const cookie = {
  set(name, value, expire) {
    let expirePeriod = undefined;
    if (!expirePeriod) {
      expirePeriod = TokenExpiredTime;
    } else {
      expirePeriod = expire;
    }
    const time = new Date(new Date().getTime() + expirePeriod);
    document.cookie = name + '=' + value + ';expires=' + time.toUTCString() + ';path=/';
  },
  get(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg)
    if (arr) {
      return (arr[2]);
    }
    return undefined;
  },
  delete(name) {
    document.cookie = name + '=0;expires=' + new Date(0).toUTCString() + ';path=/';
  },
  deleteAll() {
    // eslint-disable-next-line 
    const cookies = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (cookies) {
      const length = cookies.length;
      for (let i = 0; i < length; i = i + 1) {
        document.cookie = cookies[i] + '=0;expires=' + new Date(0).toUTCString();
      }
    }
  },
};
export default cookie;
