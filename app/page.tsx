'use client'
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    User,
    Link,
    Tooltip,
    ChipProps,
    Chip,
    CardBody,
    Card,
    CardHeader
} from "@nextui-org/react";
import {EditIcon} from "@/Components/icon/EditIcon";
import {DeleteIcon} from "@/Components/icon/DeleteIcon";
import {EyeIcon} from "@/Components/icon/EyeIcon";
import {SearchIcon} from "@/Components/icon/SearchIcon";
import {users} from "@/Components/icon/data";
import {getCollectList, getCollectiondetailList, getCreateList, getMusicUrl, getSeriesdetailList} from "@/utils/client/apihttp";

type User = typeof users[0];

export default function App() {
    const columns = [
        {name: "标题", uid: "title"},
        // {name: "封面", uid: "cover"},
        {name: "源地址", uid: "bvid"},
        // {name: "ACTIONS", uid: "actions"},
    ];
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const recommendList = [
        {
            title: '咻·循环',
            url: 'https://space.bilibili.com/37754047/channel/seriesdetail?sid=3763056'
        },
        {
            title: '咻·流行',
            url: 'https://space.bilibili.com/37754047/channel/seriesdetail?sid=3763025'
        },
        {
            title: '咻·国风',
            url: 'https://space.bilibili.com/37754047/channel/seriesdetail?sid=3763001'
        },
        {
            title: '音乐收藏夹',
            url: 'https://space.bilibili.com/1105706107/favlist?fid=2555166007&ftype=create'
        },{
            title: '邓紫棋',
            url: 'https://space.bilibili.com/490620454/channel/collectiondetail?sid=1758966'
        },{
            title: '国风',
            url: 'https://space.bilibili.com/473586817/channel/collectiondetail?sid=2049027'
        },{
            title: '老歌',
            url: 'https://space.bilibili.com/473586817/channel/collectiondetail?sid=1982280'
        },{
            title: '英文',
            url: 'https://space.bilibili.com/473586817/channel/collectiondetail?sid=2006847'
        }
    ]
    const recommendClick = (url: string) => {
        setSearchKeyWords(url);
        searchAct(url);
    }
    const [musicURl, setMusicURl] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [searchKeyWords, setSearchKeyWords] = React.useState("");
    const [data, setData] = React.useState(users);
    const onSelectionChange = async (keys: any) => {
        console.log(keys.currentKey)
        setSelectedKeys(keys);
        const musicUrl = await getMusicUrl({bvid: keys.currentKey}).then(res => res.data);
        setMusicURl(musicUrl);
        setTimeout(() => {
            audioRef.current?.play();
        },200)
    };
    const searchAct = async (keyWords = searchKeyWords) => {
        let res;
        console.log(keyWords)
        if (keyWords.includes("collectiondetail")) {
            const {mid, season_id} = extractIdsFromUrl(keyWords)
            res = await getCollectiondetailList({mid, season_id})
        } else if (keyWords.includes("favlist")) {
            const fid = getFidFromUrl(keyWords);
            res = await getCreateList({media_id: fid});
        } else if (keyWords.includes("collect")){
            const fid = getFidFromUrl(keyWords);
            res = await getCollectList({fid: fid});
        }else if (keyWords.includes("seriesdetail")){
            const {mid, series_id} = extractMidSidFromUrl(keyWords)
            res = await getSeriesdetailList({mid, series_id})
        }
        if (res.data.medias.length) {
            setData(res.data.medias);
        } else {
            setData([]);
        }
    }
    function extractMidSidFromUrl(url:string) {
        const regex = /https:\/\/space\.bilibili\.com\/(\d+)\/channel\/seriesdetail\?sid=(\d+)/;
        const match = url.match(regex);

        if (match) {
            const mid = match[1];
            const series_id = match[2];
            return { mid, series_id };
        } else {
            return {mid:'', series_id:''};
        }
    }
    function extractIdsFromUrl(url:string) {
        const regex = /https:\/\/space\.bilibili\.com\/(\d+)\/channel\/collectiondetail\?sid=(\d+)/;
        const match = url.match(regex);

        if (match) {
            const mid = match[1];
            const season_id = match[2];
            return { mid, season_id };
        } else {
            return {mid:'', season_id:''};
        }
    }

    function getFidFromUrl(url: string) {
        // 正则表达式匹配 'fid=' 后面跟着一个或多个数字
        const regex = /[?&]fid=(\d+)/;
        const match = url.match(regex);
        if (match) {
            // 返回匹配的数字部分
            return match[1];
        }
        // 如果没有匹配到，返回 null 或 undefined
        return '';
    }

    React.useEffect(() => {
        // getCollectListAct().then();
    }, []);


    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "title":
                return (
                    <User
                        avatarProps={{radius: "lg", src: user.cover}}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "bvid":
                return (
                    <Link isBlock showAnchorIcon target="_blank" href={`https://www.bilibili.com/video/${user.bvid}`}
                          color="foreground">
                    </Link>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon/>
              </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon/>
              </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon/>
              </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    return (
        <Table
            aria-label="Example table with custom cells"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
            topContent={
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center gap-3 items-center flex-col">
                        <audio controls key={musicURl} ref={audioRef}>
                            <source src={musicURl} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <div className={"w-full"}>
                            <Card>
                                {/*<CardHeader className="flex gap-3">*/}
                                {/*    推荐：*/}
                                {/*</CardHeader>*/}
                                <CardBody>
                                    <div className="flex gap-4">
                                        {recommendList.map((item) => (
                                            <Chip key={item.url}
                                                  onClick={() => recommendClick(item.url)}>{item.title}</Chip>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>

                        </div>
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="请输入B站收藏夹地址"
                            startContent={<SearchIcon onClick={()=>searchAct(searchKeyWords)}/>}
                            value={searchKeyWords}
                            onValueChange={setSearchKeyWords}
                        />
                    </div>
                </div>
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data}>
                {(item) => (
                    <TableRow key={item.bvid}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>


    );
}
