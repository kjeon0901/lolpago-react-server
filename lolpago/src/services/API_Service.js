import axios from 'axios';

export const BASE_URL = 'https://lolpago.ai.ngrok.io';
const API_BASE_URL = `${BASE_URL}`;

export function statLookup(nickname) {
  /*소환사 : 통계 조회*/
  return axios.get(API_BASE_URL + `/summoner/v1/${nickname}`);
}

export function searchChamp(nickname) {
  /*소환사 : 주 챔피언 검색*/
  return axios.get(API_BASE_URL + `/summoner/v1/most/${nickname}`);
}

export function summonerScore(nickname){
  /*소환사 : 점수 계산*/
  return axios.get(API_BASE_URL + `/summoner/v1/score/${nickname}`);
}

export function searchSummoner(nickname) {
  /*소환사 검색(검색 미리보기)*/
  return axios.get(API_BASE_URL + `/summoner/v1/find/${nickname}`);
}

export function recordLookup(nickname) {
  /*소환사 : 패배 기록 조회(최근 20판 중)*/
  return axios.post(API_BASE_URL + `/summoner/v1/defeats/${nickname}`);
}
export function avgLookup(most_champ_id) {
  /*챔피언 : 모스트 유저들의 평균 통계 조회*/
  return axios.post(API_BASE_URL + `/stats/most/${most_champ_id}`);
}
