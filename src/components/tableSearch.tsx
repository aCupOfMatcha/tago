import React, { useState } from "react";
import './tableSearch.css';
import { Input } from "antd";

interface searchComProps {
    searchMethod: (inputValue: string) => void;
    createMethod: () => void;
}

const tableSearch: React.FC<searchComProps> = ({ searchMethod, createMethod }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    return (
        <div className="searchCom">
            <div className="left">
                <Input
                    placeholder="请输入要查询的内容"
                    allowClear
                    className="input"
                    onChange={handleChange}
                />
                <button className="searchBtn" onClick={() => searchMethod(inputValue)}>查询</button>
            </div>
            <div className="right">
                <button className="newBtn" onClick={() => createMethod()}>新建</button>
            </div>
        </div>
    )
}

export default tableSearch;