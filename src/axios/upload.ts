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

/**
 * 上传文件
 */
export function uploadFile() {
  return axios.post(baseApiUrl + `/upload/add`);
}

/**
 * 下载文件
 */
export function downloadFile(name: string) {
  return axios.get(baseApiUrl + `/upload/download/${name}`, {
    responseType: 'blob', // 重要：指定响应类型为 Blob
  });
}
