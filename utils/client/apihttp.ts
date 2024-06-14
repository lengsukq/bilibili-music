import {post} from "./fetchUtil";
export interface getMusicUrlParams {
    bvid: string;
}
// 获取音乐下载地址
export async function getMusicUrl(params:getMusicUrlParams) {
    return post(`/api/getMusicUrl`,params);
}

export interface getCollectListParams {
    fid: string;
}
export async function getCollectList(params:getCollectListParams) {
    return post(`/api/getCollectList`,params);
}
export interface getCreateListParams {
    media_id: string;
}
export async function getCreateList(params:getCreateListParams) {
    return post(`/api/getCreateList`,params);
}
export interface getCollectiondetailListParams {
    mid: string;
    season_id: string;
}
export async function getCollectiondetailList(params:getCollectiondetailListParams) {
    return post(`/api/getCollectiondetailList`,params);
}
export interface getSeriesdetailListParams {
    mid: string;
    series_id: string;
}
export async function getSeriesdetailList(params:getSeriesdetailListParams) {
    return post(`/api/getSeriesdetailList`,params);
}