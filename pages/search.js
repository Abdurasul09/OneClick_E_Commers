import React from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Buttons/Buttons";
import ProductItem from "../src/components/ProductItem";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import api from "../api/globalApi";
import {useSelector} from "react-redux";

const Search = ({products}) => {
    const {posts} = useSelector(state => state.posts)
    const nameFilter = products.filter(el => el.name === posts.name)
    console.log(nameFilter, 'nameFilter')
    console.log(posts, 'posts')
    console.log(products, 'products')


    return (
        <Layout>
            <Buttons/>
            <ProductItem
                product={posts}
                addToCartHandler={addToCartHandler}
            />
        </Layout>
    );
};

export default Search;

export async function getServerSideProps() {
    const res = await api(`/products`)
    const products = await res.data.results
    return {props: {products}}
}
