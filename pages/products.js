import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShowSelect from "../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../components/ecommerce/Filter/SortSelect";
import Breadcrumb2 from "../components/layout/Breadcrumb2";
import CategoryProduct from "./../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "./../components/ecommerce/Filter/PriceRangeSlider";
import SizeFilter from "./../components/ecommerce/Filter/SizeFilter";
import VendorFilter from "./../components/ecommerce/Filter/VendorFilter";
import Pagination from "./../components/ecommerce/Pagination";
import QuickView from "./../components/ecommerce/QuickView";
import SingleProduct from "./../components/ecommerce/SingleProduct";
import Layout from "./../components/layout/Layout";
import { fetchProducts } from "../redux/action/product";
import Loading from "../components/elements/Loading";

const Products = ({ filteredProducts, productFilters, fetchProducts }) => {
    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit = 12,
        showPagination = 4;


    let [loaded, setLoaded] = useState(false);
    let [products, setProducts] = useState({items: []});
    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProducts(searchTerm, productFilters);
        console.log("products", products);
        console.log("filters", productFilters);
        cratePagination();
    }, [productFilters, limit, pages]);

    useEffect(() => {
        productsSetHandler();
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, [filteredProducts.items]);

    useEffect(() => {
        setProducts({ items: [] });

    }, []);

    const cratePagination = () => {
        // set pagination
        let arr = new Array(Math.ceil(products.items.length / limit))
            .fill()
            .map((_, idx) => idx + 1);

        setPagination(arr);
        setPages(Math.ceil(products.items.length / limit));
    };

    const productsSetHandler = () => {
        setProducts(filteredProducts);
    };

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = products.items.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(products.items.length / Number(e.target.value)));
    };



    return (
        <>
            <Layout noBreadcrumb="d-none">
            <Breadcrumb2/>
                <section className="mt-50 mb-50">
                    <div className="container mb-30">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                                { !loaded ? <Loading /> :
                                    !getPaginatedProducts.length && (
                                        <h3>No Products Found </h3>
                                    )
                                }

                                { (loaded && !!getPaginatedProducts.length) && (
                                    <>
                                        <div className="shop-product-fillter">
                                            <div className="totall-product">
                                                <p>
                                                    We found
                                                    <strong className="text-brand">
                                                        {products.items.length}
                                                    </strong>
                                                    items for you!
                                                </p>
                                            </div>
                                            <div className="sort-by-product-area">
                                                <div className="sort-by-cover mr-10">
                                                    <ShowSelect
                                                        selectChange={selectChange}
                                                        showLimit={showLimit}
                                                    />
                                                </div>
                                                <div className="sort-by-cover">
                                                    <SortSelect />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row product-grid">
                                            {getPaginatedProducts.map((item, i) => (
                                                <div
                                                    className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                                    key={i}
                                                >
                                                    <SingleProduct product={item} />
                                                    {/* <SingleProductList product={item}/> */}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                            <nav aria-label="Page navigation example">
                                                <Pagination
                                                    getPaginationGroup={
                                                        getPaginationGroup
                                                    }
                                                    currentPage={currentPage}
                                                    pages={pages}
                                                    next={next}
                                                    prev={prev}
                                                    handleActive={handleActive}
                                                />
                                            </nav>
                                        </div></>
                                )}
                            </div>
                            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        Category
                                    </h5>
                                    <CategoryProduct />
                                </div>

                                <div className="sidebar-widget price_range range mb-30">
                                <h5 className="section-title style-1 mb-30">Fill by price</h5>

                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <br />
                                            <PriceRangeSlider />

                                            <br />
                                        </div>
                                    </div>

                                    {/*<div className="list-group">
                                        <div className="list-group-item mb-10 mt-10">
                                            <label className="fw-900">
                                                Color
                                            </label>
                                            <VendorFilter />
                                            <label className="fw-900 mt-15">
                                                Item Condition
                                            </label>
                                            <SizeFilter />
                                        </div>
                                    </div>*/}
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>

                                {/*<div className="sidebar-widget product-sidebar  mb-30 p-30 bg-grey border-radius-10">
                                    <h5 className="section-title style-1 mb-30">New products</h5>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-3.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h5>
                                                <a>Chen Cardigan</a>
                                            </h5>
                                            <p className="price mb-0 mt-5">
                                                $99.50
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{width: "90%"}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-4.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h6>
                                                <a>Chen Sweater</a>
                                            </h6>
                                            <p className="price mb-0 mt-5">
                                                $89.50
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{width: "80%"}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-post clearfix">
                                        <div className="image">
                                            <img
                                                src="/assets/imgs/shop/thumbnail-5.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="content pt-10">
                                            <h6>
                                                <a>Colorful Jacket</a>
                                            </h6>
                                            <p className="price mb-0 mt-5">
                                                $25
                                            </p>
                                            <div className="product-rate">
                                                <div
                                                    className="product-rating"
                                                    style={{width: "60%"}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                {/*<div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                                    <img
                                        src="/assets/imgs/banner/banner-11.png"
                                        alt=""
                                    />
                                    <div className="banner-text">
                                        <span>Oganic</span>
                                        <h4>
                                            Save 17% <br />
                                            on{" "}
                                            <span className="text-brand">
                                                Oganic
                                            </span>
                                            <br />
                                            Juice
                                        </h4>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </section>
                {/* <WishlistModal /> */}
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                <QuickView />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <Search />
                        </div>
                        <div className="col-xl-6">
                            <SideBarIcons />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-6">
                            <CategoryProduct />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3">
                        </div>
                        <div className="col-md-9">
                        </div>
                    </div>
                </div> */}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    filteredProducts: state.products,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProducts,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);