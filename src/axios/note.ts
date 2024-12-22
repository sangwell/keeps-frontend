import axios from 'axios';

/**
 * 查询note
 */
export function getNotes() {
  return axios.get(`http://localhost:8066/notes/get`);
}

/**
 * 新增note
 */
export function addNote(data: any) {
  return axios.post('http://localhost:8066/notes/add', data);
}

/**
 * 修改note
 */
export function updateNote(data: any) {
  return axios.put('http://localhost:8066/notes/update', data);
}

/**
 * 删除note
 */
export function deleteNote(id: string) {
  return axios.delete(`http://localhost:8066/notes/delete/${id}`);
}
