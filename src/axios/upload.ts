import axios from 'axios';
import baseApiUrl from './url.ts';

/**
 * 获取文件列表
 */
export function getFileNames() {
  return axios.get(baseApiUrl + '/upload/get');
}

/**
 * 删除文件
 */
export function deleteFile(name: string) {
  return axios.delete(baseApiUrl + `/upload/delete/${name}`);
}
