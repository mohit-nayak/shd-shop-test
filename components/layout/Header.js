import Link from "next/link";
import React, { useEffect, useState } from "react";
import i18n from "../../i18n";
import Router from "next/router";
import { connect } from "react-redux";
import CategoryProductMainMenu from "../ecommerce/Filter/CategoryProductMainMenu";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import Search from "../ecommerce/Search";
import { getCategories, signOut } from "../../rest/calls";
import { clearCart } from "../../redux/action/cart";
import { clearWishlist } from "../../redux/action/wishlistAction";
import { FaPhoneSquareAlt as Icon } from "react-icons/fa";

const Header = ({
	totalCartItems,
	totalCompareItems,
	toggleClick,
	totalWishlistItems,
	authPage,
	clearCart,
	clearWishlist,
}) => {
	const [isToggled, setToggled] = useState(false);
	const [categories, setCategories] = useState([]);
	const [auth, setAuth] = useState(false);
	const [scroll, setScroll] = useState(0);
	const [lang, setLang] = useState("en");

	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrollCheck = window.scrollY >= 100;
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck);
			}
		});

		let token = localStorage.getItem("token");
		if (!token) {
			return setAuth(false);
		}
		setAuth(true);

		getCategories().then((res) => setCategories(res));
	}, []);

	const handleToggle = () => {
		setToggled(!isToggled);
	};

	const changeLanguageHandler = (ln) => {
		i18n.changeLanguage(ln).then(() => {
			localStorage.setItem("lang", ln);
			setLang(ln);
		});
	};

	const signOutHandler = () => {
		clearCart();
		clearWishlist();
		signOut();
		Router.push("/");
		setTimeout(() => {
			window.location.reload();
		}, 500);
	};

	useEffect(() => {
		const language = localStorage.getItem("lang");
		if (language) {
			changeLanguageHandler(language);
		}
	});

	return (
		<>
			<header className="header-area header-style-1 header-height-2">
				{/*<div className="mobile-promotion">
                    <span>
                        Grand opening, <strong>up to 15%</strong> off all items.
                        Only <strong>3 days</strong> left
                    </span>
                </div>*/}
				<div className="header-top header-top-ptb-1 d-lg-block">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-xl-3 col-lg-4">
								
							</div>
							<div className="col-xl-6 col-lg-4">
								
							</div>
							<div className="col-xl-3 col-lg-4">
								<div className="header-info header-info-right">
									<ul>
										
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-middle header-middle-ptb-1 d-none d-lg-block">
					<div className="container">
						<div className="header-wrap justify-content-between">
							<div className="logo logo-width-1">
								<Link href="/">
									
										<img src="/assets/imgs/logo.webp" alt="logo" />
									
								</Link>
							</div>
							<div className="header-action-icon-2 d-block d-lg-none">
								<div
									className="burger-icon burger-icon-white"
									onClick={toggleClick}
								>
									<span className="burger-icon-top"></span>
									<span className="burger-icon-mid"></span>
									<span className="burger-icon-bottom"></span>
								</div>
							</div>
							{!authPage && (
								<div className="header-right d-none d-lg-flex">
									<div className="search-style-3">
										<Search />
									</div>
									<div className="header-action-right">
										<div className="header-action-2">
											
											<div className="header-action-icon-2">
												<Link href="/shop-wishlist">
													
														<img
															className="svgInject"
															alt="Evara"
															src="/assets/imgs/theme/icons/icon-heart.svg"
														/>
														<span className="pro-count blue">
															{totalWishlistItems}
														</span>
													
												</Link>
												<Link href="/shop-wishlist">
													<span className="lable">Merkzettel</span>
												</Link>
											</div>
											<div className="header-action-icon-2">
												<Link className="mini-cart-icon" href="/shop-cart">
													
														<img
															alt="Evara"
															src="/assets/imgs/theme/icons/icon-cart.svg"
														/>
														<span className="pro-count blue">
															{totalCartItems}
														</span>
													
												</Link>
												<Link href="/shop-cart">
													
														<span className="lable">Warenkorb</span>
													
												</Link>
											</div>

											{!auth && !authPage && (
												<div className="header-action-icon-2">
													<Link href="/page-login">
														
															<img
																className="svgInject"
																alt="Nest"
																src="/assets/imgs/theme/icons/icon-user.svg"
															/>
														
													</Link>
													<Link href="/page-login">
														
															<span className="lable ml-0">Konto</span>
														
													</Link>
												</div>
											)}
											{auth && (
												<div className="header-action-icon-2">
													<Link href="/page-account">
														
															<img
																className="svgInject"
																alt="Nest"
																src="/assets/imgs/theme/icons/icon-user.svg"
															/>
														
													</Link>
													<Link href="/page-account">
														
															<span className="lable ml-0">Konto</span>
														
													</Link>
													<div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
														<ul>
															<li>
																<Link href="/page-account">
																	
																		<i className="fi fi-rs-user mr-10"></i>
																		Mein Konto
																	
																</Link>
															</li>
															
															<li>
																<Link href="/shop-wishlist">
																	
																		<i className="fi fi-rs-heart mr-10"></i>
																		Merkliste
																	
																</Link>
															</li>
															
															<li>
																<a onClick={signOutHandler}>
																	<i className="fi fi-rs-sign-out mr-10"></i>
																	Logout
																</a>
															</li>
														</ul>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							)}
						</div>

						{!authPage && (
							<div className="header-right d-block d-lg-none">
								<div className="search-style-2">
									<Search />
								</div>
								<div className="header-action-right">
									<div className="header-action-2">
										<div className="header-action-icon-2">
											<Link href="/shop-wishlist">
												
													<img
														className="svgInject"
														alt="Evara"
														src="/assets/imgs/theme/icons/icon-heart.svg"
													/>
													<span className="pro-count blue">
														{totalWishlistItems}
													</span>
												
											</Link>
											<Link href="/shop-wishlist">
												<span className="lable">Wishlist</span>
											</Link>
										</div>
										<div className="header-action-icon-2">
											<Link href="/shop-cart" className="mini-cart-icon">
												
													<img
														alt="Evara"
														src="/assets/imgs/theme/icons/icon-cart.svg"
													/>
													<span className="pro-count blue">
														{totalCartItems}
													</span>
												
											</Link>
											<Link href="/shop-cart">
												
													<span className="lable">Cart</span>
												
											</Link>
										</div>

										{!auth && !authPage && (
											<div className="header-action-icon-2">
												<Link href="/page-login">
													
														<img
															className="svgInject"
															alt="Nest"
															src="/assets/imgs/theme/icons/icon-user.svg"
														/>
													
												</Link>
												<Link href="/page-login">
													
														<span className="lable ml-0">Account</span>
													
												</Link>
											</div>
										)}
										{auth && (
											<div className="header-action-icon-2">
												<Link href="/page-account">
													
														<img
															className="svgInject"
															alt="Nest"
															src="/assets/imgs/theme/icons/icon-user.svg"
														/>
													
												</Link>
												<Link href="/page-account">
													
														<span className="lable ml-0">Account</span>
													
												</Link>
												<div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
													<ul>
														<li>
															<Link href="/page-account">
																
																	<i className="fi fi-rs-user mr-10"></i>
																	My Account
																
															</Link>
														</li>
														
														<li>
															<Link href="/shop-wishlist">
															
																	<i className="fi fi-rs-heart mr-10"></i>
																	My Wishlist
																
															</Link>
														</li>
														
														<li>
															<a onClick={signOutHandler}>
																<i className="fi fi-rs-sign-out mr-10"></i>
																Sign out
															</a>
														</li>
													</ul>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{
					<div
						className={
							scroll
								? "header-bottom header-bottom-bg-color sticky-bar stick"
								: "header-bottom header-bottom-bg-color sticky-bar"
						}
					>
						<div className="container">
							<div className="header-wrap header-space-between position-relative">
								<div className="logo logo-width-1 d-block d-lg-none">
									<Link href="/">
										
											<img src="/assets/imgs/logo.webp" alt="logo" />
										
									</Link>
								</div>
								<div className="header-nav d-none d-lg-flex">
									<div className="main-categori-wrap d-none d-lg-block">
										<a
											className="categories-button-active"
											onClick={handleToggle}
										>
											<span className="fi-rs-apps"></span>
										</a>

										<div
											className={
												isToggled
													? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
													: "categories-dropdown-wrap categories-dropdown-active-large font-heading"
											}
										>
											<div className="d-flex categori-dropdown-inner">
												<CategoryProduct2 categories={categories} />
												<CategoryProduct3 categories={categories} />
											</div>
										</div>
									</div>

									<CategoryProductMainMenu categories={categories} />
								</div>
								<div className="hotline d-none d-lg-flex">
									<Icon className="hphone" />

									<p>
										052 745 24 09<span>Telefon Support</span>
									</p>
								</div>

								<div className="header-action-right d-block d-lg-none">
									<div className="header-action-2">
										<div className="header-action-icon-2">
											<Link href="/shop-wishlist">
												
													<img
														alt="Evara"
														src="/assets/imgs/theme/icons/icon-heart.svg"
													/>
													<span className="pro-count white">
														{totalWishlistItems}
													</span>
												
											</Link>
										</div>
										<div className="header-action-icon-2">
											<Link href="/shop-cart" className="mini-cart-icon">
												
													<img
														alt="Evara"
														src="/assets/imgs/theme/icons/icon-cart.svg"
													/>
													<span className="pro-count white">
														{totalCartItems}
													</span>
												
											</Link>
										</div>
										<div
											className="header-action-icon-2 d-block d-lg-none"
											onClick={toggleClick}
										>
											<div className="burger-icon burger-icon-white">
												<span className="burger-icon-top"></span>
												<span className="burger-icon-mid"></span>
												<span className="burger-icon-bottom"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</header>
		</>
	);
};

const mapStateToProps = (state) => ({
	totalCartItems: state.cart.length,
	totalCompareItems: state.compare.items.length,
	totalWishlistItems: state.wishlist.items.length,
});

const mapDispatchToProps = {
	clearCart,
	clearWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
