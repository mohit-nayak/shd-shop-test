import React, { useEffect, useState } from "react";
import ProductDetails from "../../../components/ecommerce/ProductDetails";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { getCategories, getProducts, getUsers } from "../../../rest/calls";
import Head from "next/head";

const ProductId = ({ products, categories, users }) => {
	const {
		query: { slug },
	} = useRouter();

	const product = products?.find((item) => item?.slug === slug);
	const activeCat = categories.find((cat) => cat.slug === product.category1);

	return (
		<>
			{product && (
				<Layout
					parent="Home"
					sub="Shop"
					category={activeCat?.name}
					catSlug={activeCat?.slug}
					subChild={product?.title}
				>
				<Head>
                        <title>{activeCat?.meta_title || product?.title}</title>
                        <meta name="description" content={activeCat?.meta_description || `Buy ${product?.title} at our shop`} />
                    </Head>
					<div className="container">
						<ProductDetails product={product} users={users} />
					</div>
				</Layout>
			)}
		</>
	);
};

export const getServerSideProps = async () => {
	const [productsRes, categoriesRes, usersRes] = await Promise.allSettled([
		getProducts(),
		getCategories(),
		getUsers(),
	]);

	return {
		props: {
			products:
				productsRes.status === "fulfilled" ? productsRes.value ?? [] : [],
			categories:
				categoriesRes.status === "fulfilled" ? categoriesRes.value ?? [] : [],
			users: usersRes.status === "fulfilled" ? usersRes.value ?? [] : [],
		},
	};
};

export default ProductId;
