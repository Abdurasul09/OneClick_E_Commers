import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import api from "../../api/globalApi";
import useStyle from "../../Utils/styles";

const {SubMenu} = Menu;
const SubMenuTheme = ({active, setActive}) => {
    const [category, setCategory] = useState({})
    console.log(category)
    useEffect(() => {
        api("catalog/")
            .then(res => setCategory(res.data))
    }, [])

    const [current, setCurrent] = useState('0');
    const handleClick = e => {
        setCurrent(e.key);
    };

    const classes = useStyle();


    return (
        <div
            className={active ? "menu active" : "menu"}
            onClick={() => setActive(false)}
        >
            {category.results?.map(el => (
                <div key={el.id}>
                    <Menu
                        onClick={handleClick}
                        style={{width: 256,}}
                        defaultOpenKeys={[null]}
                        selectedKeys={[current]}
                        mode="vertical"
                    >
                        <div className={classes.flex}>
                            <img
                                style={{objectFit: "contain"}}
                                width={20}
                                height={20}
                                src={el.icon}
                                alt=""
                            />
                            <SubMenu
                                title={el.name}
                            >
                                <Menu.Item
                                    key={el.id}
                                    style={{
                                        height: 400,
                                    }}
                                >
                                    {/*{el.desc}*/}
                                    <img
                                        style={{objectFit: "contain"}}
                                        width={300}
                                        height={250}
                                        src={el.photo}
                                        alt=""
                                    />
                                </Menu.Item>
                            </SubMenu>
                        </div>

                    </Menu>
                </div>
            ))}
        </div>
    );
};

export default SubMenuTheme;