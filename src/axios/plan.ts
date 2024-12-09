import axios from 'axios';

/**
 * 查询计划
 */
export function getPlans() {
  return axios.get('http://localhost:8066/plans');
}

/**
 * 新增计划
 */
export function addPlan(data: any) {
  return axios.post('http://localhost:8066/plan', data);
}

/**
 * 删除计划
 */
export function deletePlan(id: string) {
  return axios.delete(`http://localhost:8066/plan/${id}`);
}
