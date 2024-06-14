import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

export async function POST(req:NextRequest) {
    try {
        const { mid,series_id } = await req.json();
        // 获取UP自建专辑，使用fetch请求接口获取数据
        const headers = new Headers({
            'Referer': 'https://space.bilibili.com/'
        });
        const res = await fetch(`https://api.bilibili.com/x/series/archives?mid=${mid}&series_id=${series_id}&only_normal=true&sort=desc&pn=1&ps=30`, {
            headers: headers
        }).then(res => res.json())

        res.data.medias = res.data.archives.map((item:any) => ({
            ...item,
            cover: item.pic
        }));
        return BizResult.success(res.data, '获取成功')
    } catch (error) {
        console.log(error);
        return BizResult.fail('', '系统异常');
    }
}
