import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";

/**
 * 查询snippets
 */
export function getSnippets() {
  return axios.get(baseApiUrl +`/snippets/get`);
}

/**
 * 根据id查询snippet
 */
export function getSnippetById(id: string) {
  return axios.get(baseApiUrl +`/snippets/get/${id}`);
}

/**
 * 查询snippets title list
 */
export function getSnippetsTitles() {
  return axios.get(baseApiUrl +`/snippets/getTitleList`);
}

/**
 * 新增snippet
 */
export function addSnippet(data: any) {
  return axios.post(baseApiUrl +'/snippets/add', data);
}

/**
 * 修改snippet
 */
export function updateSnippet(data: any) {
  return axios.put(baseApiUrl +'/snippets/update', data);
}

/**
 * 删除snippet
 */
export function deleteSnippet(id: string) {
  return axios.delete(baseApiUrl +`/snippets/delete/${id}`);
}
