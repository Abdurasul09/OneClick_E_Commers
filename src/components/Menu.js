import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import categories from "../components/Header/Data"

const { SubMenu } = Menu;

const SubMenuTheme = ({active, setActive}) => {
    const [current, setCurrent] = useState('0');
    const handleClick = e => {
        setCurrent(e.key);
    };

    return (
        <div
            className={active ? "menu active" : "menu"}
            onClick={() => setActive(false)}
        >
            {categories.map(el => (
                <div key={el.id}>
                    <Menu
                        onClick={handleClick}
                        style={{ width: 256, }}
                        defaultOpenKeys={[null]}
                        selectedKeys={[current]}
                        mode="vertical"
                    >
                        <SubMenu
                            key={el.sub}
                            icon={<MailOutlined />}
                            title={el.name}
                        >
                            <Menu.Item
                                key={el.id}
                                style={{
                                    height: 400,
                                }}
                            >
                                {el.desc}
                                <img
                                    width={300}
                                    height={250}
                                    src={el.image}
                                    alt=""
                                />
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            ))}
        </div>
    );
};

export default SubMenuTheme;



