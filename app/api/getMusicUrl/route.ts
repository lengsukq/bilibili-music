import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

// 退出接口
export async function POST(req:NextRequest) {
    try {
        const { bvid } = await req.json();

        // 获取cid,https://api.bilibili.com/x/web-interface/view?cid=
        const cidRes = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`).then(res => res.json()).then(res => res)
        console.log(cidRes)
        if (cidRes.code!==0) return BizResult.fail('', '请检查bvid是否正确');
        const headers = new Headers({
            'Referer': `https://www.bilibili.com/video/${bvid}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        });
        // 获取音频地址，使用fetch请求接口获取数据https://api.bilibili.com/x/player/playurl?qn=112&fnval=16&bvid=BV1fd4y1h76D&cid=634399416
        const res = await fetch(`https://api.bilibili.com/x/player/playurl?qn=112&fnval=16&bvid=${bvid}&cid=${cidRes.data.cid}`,{
            headers: headers
        }).then(res => res.json())
        return BizResult.success(res.data.dash.audio[0].baseUrl, '获取成功')
    } catch (error) {
        console.log(error);
        return BizResult.fail('', '系统异常');

    }
}
