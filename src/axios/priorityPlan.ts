import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";

/**
 * 查询PriorityPlans
 */
export function getPriorityPlans() {
  return axios.get(baseApiUrl +`/priorityPlans/get`);
}

/**
 * 新增PriorityPlan
 */
export function addPriorityPlan(data: any) {
  return axios.post(baseApiUrl +'/priorityPlans/add', data);
}

/**
 * 修改PriorityPlan
 */
export function updatePriorityPlan(data: any) {
  return axios.put(baseApiUrl +'/priorityPlans/update', data);
}

/**
 * 删除PriorityPlan
 */
export function deletePriorityPlan(id: string) {
  return axios.delete(baseApiUrl +`/priorityPlans/delete/${id}`);
}
