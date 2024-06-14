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
    ChipProps
} from "@nextui-org/react";
import {EditIcon} from "@/Components/icon/EditIcon";
import {DeleteIcon} from "@/Components/icon/DeleteIcon";
import {EyeIcon} from "@/Components/icon/EyeIcon";
import {SearchIcon} from "@/Components/icon/SearchIcon";
import {users} from "@/Components/icon/data";
import {getCollectList, getCreateList} from "@/utils/client/apihttp";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type User = typeof users[0];

export default function App() {
    const columns = [
        {name: "标题", uid: "title"},
        // {name: "封面", uid: "cover"},
        {name: "源地址", uid: "bvid"},
        // {name: "ACTIONS", uid: "actions"},
    ];
    const [searchKeyWords, setSearchKeyWords] = React.useState("");
    const [data, setData] = React.useState(users);
    const getCollectListAct = async (fid:string) => {
        const res = await getCollectList({fid: fid});
        console.log(res, "res")
        if (res.data.medias.length){
            setData(res.data.medias);
        }else{
            setData([]);
        }
    }
    const searchAct = async () => {
        let res;
        if (searchKeyWords.includes("collect")) {
            const fid = getFidFromUrl(searchKeyWords);
             res = await getCollectList({fid: fid});
        }else if(searchKeyWords.includes("favlist")){
            const fid = getFidFromUrl(searchKeyWords);
            res = await getCreateList({media_id: fid});
        }
        if (res.data.medias.length){
            setData(res.data.medias);
        }else{
            setData([]);
        }
    }
    function getFidFromUrl(url:string) {
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
                    topContent={
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between gap-3 items-end">
                                <Input
                                    isClearable
                                    className="w-full sm:max-w-[44%]"
                                    placeholder="请输入B站收藏夹地址"
                                    startContent={<SearchIcon onClick={searchAct}/>}
                                    value={searchKeyWords}
                                    onValueChange={ setSearchKeyWords}
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
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>


    );
}
