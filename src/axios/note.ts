import axios from 'axios';

/**
 * 查询计划
 */
export function getNotes() {
  return axios.get(`http://localhost:8066/notes/get`);
}

/**
 * 新增计划
 */
export function addNote(data: any) {
  return axios.post('http://localhost:8066/notes/add', data);
}

/**
 * 修改计划
 */
export function updatePlan(data: any) {
  return axios.put('http://localhost:8066/plans/update', data);
}

/**
 * 删除计划
 */
export function deleteNote(id: string) {
  return axios.delete(`http://localhost:8066/notes/delete/${id}`);
}
