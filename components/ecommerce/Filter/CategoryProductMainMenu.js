import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

const CategoryProductMainMenu = ({ categories, updateProductCategory }) => {
	const [active, setActive] = useState("");
	const router = useRouter();
	const query = router.query;

	const selectCategory = (e, category) => {
		e.preventDefault();
		// removeSearchTerm();
		updateProductCategory(category);
		router.push(`/shop/${category.toLowerCase()}`);
	};

	useEffect(() => {
		const cat = query.category ? query.category : "";

		if (categories.length > 0) {
			setActive(cat);
			updateProductCategory(cat);
		}
	}, [categories, query]);

	return (
		<>
			<div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
				<nav>
					<ul>
						{!!categories.length &&
							categories
								.sort((a, b) => (a.sort > b.sort ? 1 : -1))
								.map((cat) => (
									<li
										onClick={(e) => selectCategory(e, cat.slug)}
										key={cat.sort}
										className={active === cat.slug ? "active" : ""}
									>
										<a>{cat.name}</a>
										{/*<span className="count">30</span>*/}
									</li>
								))}

						{/*<li className="hot-deals">
                                                <img
                                                    src="/assets/imgs/theme/icons/icon-hot.svg"
                                                    alt="hot deals"
                                                />
                                                <Link href="/shop"><a>
                                                    Aktionen
                                                </a>
                                                </Link>
                                            </li>




                                            <li>
                                                <Link href="/hunde-blog">
                                                    <a>
                                                        Blog

                                                    </a>
                                                </Link>

                                            </li>*/}
					</ul>
				</nav>
			</div>
		</>
	);
};

export default connect(null, { updateProductCategory })(
	CategoryProductMainMenu
);
