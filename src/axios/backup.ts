import axios from 'axios';

/**
 * 备份数据库
 */
export function backup() {
  return axios.get('http://localhost:8066/backup');
}

