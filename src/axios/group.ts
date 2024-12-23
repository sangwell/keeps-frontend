import axios from 'axios';
import baseApiUrl from './url.ts';

/**
 * 查询分组
 */
export function getGroups() {
  return axios.get(baseApiUrl + '/groups/get');
}

/**
 * 新增分组
 */
export function addGroup(data: any) {
  return axios.post(baseApiUrl + '/groups/add', data);
}

/**
 * 修改分组名称
 */
export function updateGroupName(data: any) {
  return axios.put(baseApiUrl + '/groups/updateGroupName', data);
}

/**
 * 删除分组
 */
export function deleteGroup(id: string) {
  return axios.delete(baseApiUrl + `/groups/delete/${id}`);
}
