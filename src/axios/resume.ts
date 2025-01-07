import axios from 'axios';
import baseApiUrl from "@/axios/url.ts";

/**
 * 匹配
 */
export function match(data: any) {
  return axios.post(baseApiUrl +'/chat/match', data);
}

