import Link from "next/link";
import React, { useEffect, useState } from "react";
import useClickOutside from "../../util/outsideClick";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import Search from "../ecommerce/Search";
import { getCategories, signOut } from "../../rest/calls";
import Router from "next/router";
import { connect } from "react-redux";
import { clearCart } from "../../redux/action/cart";
import { clearWishlist } from "../../redux/action/wishlistAction";

const MobileMenu = ({ isToggled, toggleClick, clearCart, clearWishlist }) => {
	const [isActive, setIsActive] = useState({
		status: false,
		key: "",
	});
	const [auth, setAuth] = useState(false);
	const [categories, setCategories] = useState([]);

	const signOutHandler = () => {
		clearCart();
		clearWishlist();
		signOut();
		Router.push("/");
		setTimeout(() => {
			window.location.reload();
		}, 500);
	};

	const handleToggle = (key) => {
		if (isActive.key === key) {
			setIsActive({
				status: false,
			});
		} else {
			setIsActive({
				status: true,
				key,
			});
		}
	};

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (!token) {
			return setAuth(false);
		}
		setAuth(true);

		getCategories().then((res) => setCategories(res));
	}, []);

	return (
		<>
			<div
				className={
					isToggled
						? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
						: "mobile-header-active mobile-header-wrapper-style"
				}
			>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-top">
						<div className="mobile-header-logo">
							<Link href="/">
							
									<img
										style={{ width: "100px" }}
										src="/assets/imgs/logo.webp"
										alt="logo"
									/>
							
							</Link>
						</div>
						<div className="mobile-menu-close close-style-wrap close-style-position-inherit">
							<button
								className="close-style search-close"
								onClick={toggleClick}
							>
								<i className="icon-top"></i>
								<i className="icon-bottom"></i>
							</button>
						</div>
					</div>
					<div className="mobile-header-content-area">
						<div className="mobile-search search-style-3 mobile-header-border">
							<Search />
						</div>
						<div className="mobile-menu-wrap mobile-header-border">
							<div className="main-categori-wrap mobile-header-border">
								<CategoryProduct2 categories={categories} />
								<CategoryProduct3 categories={categories} />
							</div>
						</div>
						<div className="mobile-header-info-wrap mobile-header-border">
							{!auth && (
								<>
									<div className="single-mobile-header-info">
										<Link href="/page-login">
											Anmelden
										</Link>
									</div>
									<div className="single-mobile-header-info">
										<Link href="/page-register">
											Registrieren
										</Link>
									</div>
								</>
							)}
							{auth && (
								<>
									<div className="single-mobile-header-info">
										<Link href="/page-account">
											Mein Konto
										</Link>
									</div>
									<div className="single-mobile-header-info">
										<Link onClick={signOutHandler} href="/page-login">
											Abmelden
										</Link>
									</div>
								</>
							)}
							<div className="single-mobile-header-info">
								<Link href="/shop-cart">
									Warenkorb
								</Link>
							</div>
						</div>
						<div className="mobile-social-icon">
							<h5 className="mb-15 text-grey-4">Follow Us</h5>
							<Link href="#">
								
									<img
										src="/assets/imgs/theme/icons/icon-facebook.svg"
										alt=""
									/>
								
							</Link>
							<Link href="#">
								
									<img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
								
							</Link>
							<Link href="#">
								
									<img
										src="/assets/imgs/theme/icons/icon-instagram.svg"
										alt=""
									/>
								
							</Link>
							<Link href="#">
								
									<img
										src="/assets/imgs/theme/icons/icon-pinterest.svg"
										alt=""
									/>
								
							</Link>
							<Link href="#">
								
									<img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
								
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapDispatchToProps = {
	clearCart,
	clearWishlist,
};

export default connect(null, mapDispatchToProps)(MobileMenu);
