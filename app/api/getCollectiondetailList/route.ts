import BizResult from "@/utils/BizResult";
import {NextRequest} from 'next/server'

export async function POST(req:NextRequest) {
    try {
        const { mid,season_id } = await req.json();
        // 获取专辑列表，使用fetch请求接口获取数据
        const headers = new Headers({
            'Referer': 'https://space.bilibili.com/'
        });
        const res = await fetch(`https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=${mid}&season_id=${season_id}&page_num=1&page_size=30`, {
            headers: headers
        }).then(res => res.json())
        console.log(mid,season_id,res)

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
