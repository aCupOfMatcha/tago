import React, { useState } from "react";
import styles from './tableSearch.module.scss';
import { Input } from "antd";

interface searchComProps {
    searchMethod: (inputValue: string) => void;
    createMethod?: () => void;
    type?: 'normal' | 'file';
    CustomCom?: React.FC;
}

const tableSearch: React.FC<searchComProps> = ({ searchMethod, createMethod, CustomCom, type='normal' }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    return (
        <div className={styles.searchCom}>
            <div className='left'>
                <Input
                    placeholder="请输入要查询的内容"
                    allowClear
                    className="input"
                    onChange={handleChange}
                />
                <button className="searchBtn" onClick={() => searchMethod(inputValue)}>查询</button>
            </div>
            <div className="right">
                {type === 'normal' ? 
                <>{createMethod && <button className="newBtn" onClick={() => createMethod()}>新建</button>}</> :
                <>{CustomCom && <CustomCom />}</>}
            </div>
        </div>
    )
}

export default tableSearch;