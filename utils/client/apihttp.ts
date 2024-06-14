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
    media_id: string;
}
export async function getCollectList(params:getCollectListParams) {
    return post(`/api/getMusicUrl`,params);
}