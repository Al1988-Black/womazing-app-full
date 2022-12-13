import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import ProductCard from "../productCard";
import { useSelector } from "react-redux";
import { getProducts, getProductsLoadingStatus } from "../../../store/products";
import {
    getCategoriesLoadingStatus,
    getCategories
} from "../../../store/categories";

const ShopProductSection = () => {
    const isLoadingCategory = useSelector(getCategoriesLoadingStatus());
    const isLoadingProduct = useSelector(getProductsLoadingStatus());
    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    if (!isLoadingProduct && !isLoadingCategory) {
        const history = useHistory();
        const params = useParams();
        const { categoryId } = params;
        const [currentPage, setCurrentPage] = useState(1);
        const categorySelected =
            categories && categories.find((c) => c._id === categoryId);
        const [selectedCategory, setSelectedCategory] = useState(
            categorySelected || null
        );

        useEffect(() => {
            setSelectedCategory(categorySelected);
        }, [categorySelected]);
        useEffect(() => {
            setCurrentPage(1);
        }, [selectedCategory]);

        const handleCategorySelect = (item) => {
            setSelectedCategory(item);
            history.push(`/shop/${item._id}`);
        };
        if (products && products.length > 0) {
            const filteredProducts = selectedCategory
                ? products.filter(
                      (product) => product.category === selectedCategory._id
                  )
                : products;
            const handleClearFilter = () => {
                setSelectedCategory(null);
            };
            const count = filteredProducts.length;
            const pageSize = 9;
            const productsCrop = paginate(
                filteredProducts,
                currentPage,
                pageSize
            );
            const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

            return (
                <section className="products" id="products">
                    <div className="container">
                        {categories ? (
                            <div className="row">
                                <div className="col-12">
                                    <div className="btns-shop d-flex flex-column mx-auto mx-md-start flex-md-row">
                                        <GroupList
                                            selectedItem={selectedCategory}
                                            items={categories}
                                            onItemSelect={handleCategorySelect}
                                            onClearFilter={handleClearFilter}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            "Loading..."
                        )}

                        <div className="row">
                            <div className="col-12">
                                <p
                                    className="products-text-number"
                                    id="products-text-number"
                                >
                                    Показано: {productsCrop.length} из{" "}
                                    {filteredProducts.length} товаров
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            {productsCrop.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-12  d-flex">
                                <div className="btns-shop_page mx-auto d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        return <h3>Товаров нет</h3>;
    }
    return "Loading...";
};

export default ShopProductSection;
