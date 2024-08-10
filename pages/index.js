import React from "react";
import Head from "next/head";
import CategoryTab from "../components/ecommerce/categoryTab";
import QuickView from "./../components/ecommerce/QuickView";
import Banner5 from "./../components/elements/Banner5";
import Layout from "./../components/layout/Layout";
import Intro1 from "./../components/sliders/Intro1";
import { getProducts } from "../rest/calls";

const Home = ({ products, auth }) => {
	return (
		<>
				<Layout noBreadcrumb="d-none">
             <Head>

                {/* Title, Description */}
                <title>Bio Hundefutter zum Spitzenpreis</title>
                <meta name="description" content="Bio-Hundefutter zum Spitzenpreis mit schneller Lieferung." />
                
    
            </Head>
				<section className="home-slider position-relative mb-30">
					<div className="container">
						<div className="home-slide-cover mt-30">
							<Intro1 />
						</div>
					</div>
				</section>

				

				<section className="banners mb-25">
					<div className="container">
						<div className="row">
							<Banner5 />
						</div>
					</div>
				</section>

				

				<section className="product-tabs section-padding position-relative">
					<div className="container">
						<div className="col-lg-12">
							<CategoryTab allProducts={products} />
						</div>
					</div>
				</section>

				

				<QuickView />
			</Layout>
		</>
	);
};

export const getServerSideProps = async () => {
	const products = await getProducts();

	return {
		props: {
			products: products ?? [],
		},
	};
};

export default Home;
