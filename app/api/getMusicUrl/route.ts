import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

// 退出接口
export async function POST(req:NextRequest) {
    try {
        const { bvid,cid } = await req.json();
        // 获取音频地址，使用fetch请求接口获取数据https://api.bilibili.com/x/player/playurl?qn=112&fnval=16&bvid=BV1fd4y1h76D&cid=634399416
        const res = await fetch(`https://api.bilibili.com/x/player/playurl?qn=112&fnval=16&bvid=${bvid}&cid=${cid}`).then(res => res.json())
        console.log(res)
        if (res.code !== 0) return BizResult.fail('', '请检查bvid，cid是否正确');
        return BizResult.success(res.data.dash.audio[0].baseUrl, '获取成功')
    } catch (error) {
        console.log(error);
        return BizResult.fail('', '系统异常');

    }
}
