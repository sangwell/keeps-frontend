import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";

/**
 * 查询note
 */
export function getNotes() {
  return axios.get(baseApiUrl +`/notes/get`);
}

/**
 * 新增note
 */
export function addNote(data: any) {
  return axios.post(baseApiUrl +'/notes/add', data);
}

/**
 * 修改note
 */
export function updateNote(data: any) {
  return axios.put(baseApiUrl +'/notes/update', data);
}

/**
 * 删除note
 */
export function deleteNote(id: string) {
  return axios.delete(baseApiUrl +`/notes/delete/${id}`);
}
