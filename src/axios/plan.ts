import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";


/**
 * 查询计划
 */
export function getPlans(searchValue) {
  return axios.get(baseApiUrl + `/plans/get?searchValue=${searchValue}`);
}

/**
 * 根据groupId查询学习计划
 */
export function getPlansByGroupId(groupId: string) {
  return axios.get(baseApiUrl + `/plans/getByGroupId/${groupId}`);
}

/**
 * 新增计划
 */
export function addPlan(data: any) {
  return axios.post(baseApiUrl + '/plans/add', data);
}

/**
 * 修改计划
 */
export function updatePlan(data: any) {
  return axios.put(baseApiUrl + '/plans/update', data);
}

/**
 * 修改计划
 */
export function updateFavorite(data: any) {
  return axios.put(baseApiUrl + '/plans/updateFavorite', data);
}

/**
 * 删除计划
 */
export function deletePlan(id: string) {
  return axios.delete(baseApiUrl + `/plans/delete/${id}`);
}
