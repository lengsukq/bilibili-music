import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

// 退出接口
export async function POST(req:NextRequest) {
    try {
        const { media_id } = await req.json();
        // 获取收藏夹resources，使用fetch请求接口获取数据https://api.bilibili.com/x/v3/fav/resource/ids?media_id=3081523913&platform=web
        const res = await fetch(`https://api.bilibili.com/x/v3/fav/resource/ids?media_id=${media_id}&platform=web`).then((res) => res.json()).then((res) => res);
        if (!res.data.length) return BizResult.fail('', '请检查media_id是否正确');
        const resources = `${res.data[0].id}:${res.data[0].type}`
        // 使用fetch请求接口获取数据 https://api.bilibili.com/x/v3/fav/resource/infos?resources=1750369985:2&folder_id=3081523913
        const res2 = await fetch(`https://api.bilibili.com/x/v3/fav/resource/infos?resources=${resources}&folder_id=${media_id}`).then((res) => res.json()).then((res) => res);

        return BizResult.success(res2.data, '获取成功')
    } catch (error) {
        console.log(error);
        return BizResult.fail('', '系统异常');

    }
}
