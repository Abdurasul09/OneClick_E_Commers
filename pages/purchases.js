import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import ProfilePages from "../src/components/Profile/ProfilePage/ProfilePages";
import Axios from "../api/Api";
import RecentlyViewed from "../src/components/Common/RecentlyViewed";
import CheckoutWizard from "../src/components/ChekoutWizard/ChekoutWizard";
import useStyle from "../Utils/styles";
import {Card} from "@material-ui/core";

const Purchases = () => {
    const [purchases, setPurchases] = useState({})
    const [ToggleState, setToggleState] = useState(1);
    const [orders, setOrders] = useState()
    const classes = useStyle();

    console.log(orders)
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";

    const getPurchases = async () => {
        try {
            const res = await Axios.get('/user/purchases')
            setPurchases(res.data)
            const res2 = await Axios.get('/orders')
            console.log(res2)
            setOrders(res2.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getPurchases()
    }, [])


    return (
        <Layout title="Покупки">
            <ProfilePages/>
            <div>
                <ul className="tab-list">
                    <li
                        className={`tabs ${getActiveClass(1, "active-tabs")}`}
                        onClick={() => toggleTab(1)}
                    >
                        Заказы
                    </li>
                    <li
                        className={`tabs ${getActiveClass(2, "active-tabs")}`}
                        onClick={() => toggleTab(2)}
                    >
                        Покупки
                    </li>
                    <li
                        className={`tabs ${getActiveClass(3, "active-tabs")}`}
                        onClick={() => toggleTab(3)}
                    >
                        Возвраты
                    </li>
                    <li
                        className={`tabs ${getActiveClass(4, "active-tabs")}`}
                        onClick={() => toggleTab(4)}
                    >
                        Оформления возврата
                    </li>
                </ul>

                <div className="content-container">
                    {orders?.results.map(el => (
                        <div key={el.id}>
                            <Card style={{padding: "0 10px", marginTop: 10}}>
                                <div className={`content ${getActiveClass(1, "active-content")}`}>
                                    {el.items?.map(item => (
                                        <div key={item.id}>
                                            <table className='content__table'>
                                                <thead className='table__head'>
                                                <tr className='content__row'>
                                                    <th className='content__row__header'>
                                                        <img
                                                            className='content__row__header__image'
                                                            src={item.image}
                                                            alt="product image"
                                                        />
                                                    </th>
                                                    <div className='content__title__price'>
                                                        <th className='content__row__header'>
                                                            <h3>{item.name}</h3>
                                                            <p>{item.title}</p>
                                                            <span className='content__row__date'>
                                                                    Дата заказа {el.created_at.substring(0, 10)}
                                                                </span>
                                                        </th>
                                                        <th className='content__row__header'>
                                                            <p>{item.price} C</p>
                                                            <span className='content__row__delete'>
                                                                Удалит
                                                            </span>
                                                        </th>
                                                    </div>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    ))}
                                    <CheckoutWizard status={el.status}/>
                                </div>
                            </Card>
                        </div>
                    ))}
                    {purchases.results?.map(el => (
                        <div key={el.id}>
                            <Card style={{padding: "0 10px", marginTop: 10}}>
                                <div className={`content ${getActiveClass(2, "active-content")}`}>
                                    <table className='content__table'>
                                        <thead>
                                        <tr className='content__row'>
                                            <th className='content__row__header'>
                                                <img
                                                    className='content__row__header__image'
                                                    src={el.image}
                                                    alt="product image"
                                                />
                                            </th>
                                            <th className='content__row__header'>
                                                <h3>{el.name}</h3>
                                                <p>{el.title}</p>
                                            </th>
                                            <th className='content__row__header'>{el.price} C</th>
                                            <th className=''>{}</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <RecentlyViewed/>
        </Layout>
    );
};

export default Purchases;
