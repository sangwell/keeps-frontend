import axios from 'axios';

/**
 * 查询分组
 */
export function getGroups() {
  return axios.get('http://localhost:8066/groups');
}

/**
 * 新增分组
 */
export function addGroup(data: any) {
  return axios.post('http://localhost:8066/group', data);
}

/**
 * 修改分组名称
 */
export function updateGroupName(data: any) {
  return axios.put('http://localhost:8066/updateGroupName', data);
}

/**
 * 删除分组
 */
export function deleteGroup(id: string) {
  return axios.delete(`http://localhost:8066/group/${id}`);
}
