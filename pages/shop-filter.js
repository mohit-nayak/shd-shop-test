import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "./../components/ecommerce/Pagination";
import QuickView from "./../components/ecommerce/QuickView";
import ShowSelect from "./../components/ecommerce/Filter/ShowSelect";
import SingleProduct from "./../components/ecommerce/SingleProduct";
import SortSelect from "./../components/ecommerce/Filter/SortSelect";
import WishlistModal from "./../components/ecommerce/WishlistModal";
import Layout from "./../components/layout/Layout";
import { fetchProducts } from "./../redux/action/product";
import ShopFilter from "././../components/ecommerce/Filter/Filter";

const ProductsFullWidth = ({ products, productFilters, fetchProducts }) => {

    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit = 12,
        showPagination = 4;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProducts(searchTerm, productFilters);
        cratePagination();
    }, [productFilters, limit, pages, products.items.length]);

    const cratePagination = () => {
        let arr = new Array(Math.ceil(products.items.length / limit))
            .fill()
            .map((_, idx) => idx + 1);

        setPagination(arr);
        setPages(Math.ceil(products.items.length / limit));
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
            <Layout parent="Home" sub="Shop" subChild="Filter">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <ShopFilter />
                            </div>
                            <div className="col-lg-12">
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
                                <div className="row product-grid-3">
                                    {getPaginatedProducts.length === 0 && (
                                        <h3>No Products Found </h3>
                                    )}

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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WishlistModal />
                <QuickView />
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFullWidth);
