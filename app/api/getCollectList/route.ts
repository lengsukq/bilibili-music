import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

// 退出接口
export async function POST(req:NextRequest) {
    try {
        const { media_id } = await req.json();
        // 获取收藏夹列表，使用fetch请求接口获取数据https://api.bilibili.com/x/v3/fav/resource/list?media_id=*********&pn=1&ps=20&keyword=&order=mtime&type=0&tid=0&platform=web
        const res = await fetch(`https://api.bilibili.com/x/v3/fav/resource/list?media_id=${media_id}&pn=1&ps=20&keyword=&order=mtime&type=0&tid=0&platform=web`).then(res => res.json())
        return BizResult.success(res.data, '获取成功')
    } catch (error) {
        console.log(error);
        return BizResult.fail('', '系统异常');
    }
}
