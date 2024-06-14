import {post} from "./fetchUtil";
export interface getMusicUrlParams {
    bvid: string;
    cid: string;
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