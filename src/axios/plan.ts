import axios from 'axios';

/**
 * 查询计划
 */
export function getPlans(searchValue) {
  return axios.get(`http://localhost:8066/plans/get?searchValue=${searchValue}`);
}

/**
 * 根据groupId查询学习计划
 */
export function getPlansByGroupId(groupId: string) {
  return axios.get(`http://localhost:8066/plans/getByGroupId/${groupId}`);
}

/**
 * 新增计划
 */
export function addPlan(data: any) {
  return axios.post('http://localhost:8066/plans/add', data);
}

/**
 * 修改计划
 */
export function updatePlan(data: any) {
  return axios.put('http://localhost:8066/plans/update', data);
}

/**
 * 修改计划
 */
export function updateFavorite(data: any) {
  return axios.put('http://localhost:8066/plans/updateFavorite', data);
}

/**
 * 删除计划
 */
export function deletePlan(id: string) {
  return axios.delete(`http://localhost:8066/plans/delete/${id}`);
}
