import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";

/**
 * 匹配
 */
export function match(data: any) {
  return axios.post(baseApiUrl +'/chat/match', data);
}

/**
 * 匹配Stream
 */
export function matchStream(data: any) {
  return axios.post(baseApiUrl +'/chat/matchStream', data);
}

