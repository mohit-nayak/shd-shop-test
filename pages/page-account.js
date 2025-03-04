import Layout from "../components/layout/Layout";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { getOrders, getCurrentUser, signOut, setPassword, updateProfile } from '../rest/calls';
import { getMonthName, getMonthNameGerman, isPasswordValidated } from "../util/util";
import Router from "next/router";
import {fetchProducts} from "../redux/action/product";
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next';

function Account({ fetchProducts, products, auth, validateRedirect }) {
    const [activeIndex, setActiveIndex] = useState(1);
    const [currentUser, setCurrentUser] = useState({});
    const [orders, setOrders] = useState([]);
    // const [currentPass, setCurrentPass] = useState('');
    const [showPassInput, setShowPassInput] = useState(false);
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [profileDataChanged, setProfileDataChanged] = useState(false);
    const [passwordChangeActive, setPasswordChangeActive] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [triedSubmit, setTriedSubmit] = useState(false);
    const [triedPassSubmit, setTriedPassSubmit] = useState(false);
    const [profileError, setProfileError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };

    const passwordChangeHandler = () => {
        const changed = !!(newPass.trim() || confirmPass.trim());
        const validated = (newPass.trim() === confirmPass.trim()) && isPasswordValidated(newPass);
        setPasswordChangeActive(changed);
        setPasswordValid(validated);
    };

    const fetchCurrentUser = async () => {
        const user = await getCurrentUser();
        setCurrentUser(user);
    };

    const fetchOrders = async () => {
        const orders = await getOrders();
        setOrders(orders);
    };

    const profileFormSubmitHandler = async (e) => {
        e.preventDefault();
        setTriedSubmit(true);

        const profileData = {
            username: e.target.username.value,
            first_name: e.target.fName.value,
            last_name: e.target.lName.value,
            phone: e.target.phone.value,
        };

        const passwordData = {
            // current_password: e.target.currentPassword.value,
            password: showPassInput ? e.target.newPassword.value : '',
        };

        if (profileDataChanged) {
            updateProfile(profileData)
                .then(() => {
                    fetchCurrentUser();
                    hidePassInputHandler();
                    setProfileError(null);
                    showSuccessHandler();
                    console.log("profile success")
                })
                .catch(err => {
                    console.log("profile error")
                    setProfileError("Invalid profile details!");
                });
        }

        if (passwordChangeActive && passwordValid) {
            setTriedPassSubmit(true);
            updateProfile(passwordData)
                .then(() => {
                    fetchCurrentUser();
                    hidePassInputHandler();
                    setPasswordError(null);
                    showSuccessHandler();
                    console.log("password success")
                })
                .catch(err => {
                    console.log("password error")
                    setPasswordError("Invalid password!");
                });
        }
    };

    const signOutHandler = () => {
        signOut().then(() => Router.push('/page-login'));
    };

    const hidePassInputHandler = () => {
        setShowPassInput(false);
    };

    const showSuccessHandler = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(null)
        }, 5000);
    }

    useEffect(() => {
        passwordChangeHandler();
    }, [newPass, confirmPass, /*currentPass*/]);

    useEffect(() => {
        validateRedirect();

        if (auth) {
            fetchProducts();
            fetchCurrentUser();
            fetchOrders();
        }
    }, []);

   const {t} = useTranslation();

   const lang = t("utils-lang")

    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Account">
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="dashboard-menu">
                                            <ul className="nav flex-column" role="tablist">
                                                <li className="nav-item">
                                                    <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}><i className="fi-rs-settings-sliders mr-10"></i>{t("account-dashboard")}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={activeIndex === 2 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(2)}><i className="fi-rs-shopping-bag mr-10"></i>{t("account-orders")}</a>
                                                </li>
                                                {/*<li className="nav-item">
                                                    <a className={activeIndex === 3 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(3)}><i className="fi-rs-shopping-cart-check mr-10"></i>Track Your Order</a>
                                                </li>*/}
                                                {/*<li className="nav-item">
                                                    <a className={activeIndex === 4 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(4)}><i className="fi-rs-marker mr-10"></i>My Address</a>
                                                </li>*/}
                                                <li className="nav-item">
                                                    <a className={activeIndex === 5 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(5)}><i className="fi-rs-user mr-10"></i>{t("account-details")}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" onClick={signOutHandler}><i className="fi-rs-sign-out mr-10"></i>{t("account-logout")}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="tab-content account dashboard-content ps-0 ps-lg-4">
                                            <div className={activeIndex === 1 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        { currentUser.first_name && <h3 className="mb-0">{t("account-hello")} { currentUser?.first_name }</h3>}
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            {t("account-intro")} <a href="#" onClick={() => handleOnClick(2)}>{t("account-orders")}</a>,<br />
                                                            <a href="#" onClick={() => handleOnClick(4)}>{t("account-shipping")}</a> & <a href="#" onClick={() => handleOnClick(5)}>{t("account-details-info")}.</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex === 2 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">{t("account-orders-title")}</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>{t("account-orders-no")}</th>
                                                                        <th>{t("account-orders-date")}</th>
                                                                        <th>Status</th>
                                                                        <th>Total</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    { orders && orders.map((order, i) => {
                                                                        const orderDate = new Date(order.ordered_date);
                                                                        const shippingAddress = order.shipping_address;
                                                                        const billingAddress = order.invoice_address;
                                                                        const orderDateString = ` ${orderDate.getDate()}. ${getMonthNameGerman(orderDate.getMonth())} ${orderDate.getFullYear()}`
                                                                        const orderTimeString = `${orderDate.getHours()}:${orderDate.getMinutes()}`;
                                                                        return (
                                                                            <>
                                                                                <tr key={i} className={(activeOrder === order.id) ? "bg-grey-10" : ""}>
                                                                                    <td>#{ order.id }</td>
                                                                                    <td>{ orderDateString }</td>
                                                                                    <td> { order.ordered ? `${t("account-orders-complete")}` : `${t("account-orders-pending")}` }</td>
                                                                                    <td>CHF { order.total_order_amount.toFixed(2) } / { order.products.length } { order.products.length > 1 ? `${t("account-orders-items")}`: `${t("account-orders-items")}` }</td>
                                                                                    <td>
                                                                                        { (activeOrder === order.id) ?
                                                                                            <button className="btn btn-xs btn-link d-block" onClick={() => setActiveOrder(null)}>Schliessen</button>
                                                                                            : <button className="btn btn-xs d-block" onClick={() => setActiveOrder(order.id)}>{t("account-orders-view")}</button>
                                                                                        }
                                                                                    </td>
                                                                                </tr>
                                                                                { (activeOrder === order.id) && (
                                                                                    <tr className="order-details-container">
                                                                                        <td colSpan={5}>
                                                                                            <div className="shopping-summery">
                                                                                                { order.products.map(el => {
                                                                                                    const product = products.find(i => i.id === el.item);
                                                                                                    return (
                                                                                                        <div className="d-flex align-items-center flex-nowrap">
                                                                                                            <div className="image product-thumbnail">
                                                                                                                { product?.product_image?.length ?
                                                                                                                    <img src={product.product_image[0].image} alt={product.product_image[0].alt} />
                                                                                                                    : <img src="data:image/jpeg;base64,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" alt={product.title} />
                                                                                                                }
                                                                                                            </div>

                                                                                                            <div className="product-des product-name ms-3">
                                                                                                                <h6 className="product-name">
                                                                                                                    <Link href={`/products/${product.slug}`}>
                                                                                                                       { product.title }
                                                                                                                    </Link>
                                                                                                                </h6>
                                                                                                                <h6 className="price">CHF {product.price} | # {el.quantity}</h6>
                                                                                                            </div>

                                                                                                            <div className="ms-auto me-3">
                                                                                                                <h6 className="text-brand">CHF {(product.price * el.quantity).toFixed(2)}</h6>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}

                                                                                                <div className="mb-3 mt-4 d-flex flex-wrap">
                                                                                                    <div className="d-flex">
                                                                                                        <div className="me-4">
                                                                                                            <h6 className="mb-2">Lieferadresse</h6>
                                                                                                            <div>
                                                                                                                <span className="d-block">{ `${shippingAddress?.street}, ${shippingAddress?.number} `}</span>
                                                                                                                <span className="d-block">{ `${shippingAddress?.country} - ${shippingAddress?.zipcode}, ${shippingAddress?.city} `}</span>
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div>
                                                                                                            <h6 className="mb-2">Rechnungsadresse</h6>
                                                                                                            <div>
                                                                                                                <span className="d-block">{ `${billingAddress?.street}, ${billingAddress?.number} `}</span>
                                                                                                                <span className="d-block">{ `${billingAddress?.country} - ${billingAddress?.zipcode}, ${billingAddress?.city} `}</span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="ms-auto mr-30 mt-4 mt-lg-0 d-flex flex-column justify-content-between align-items-end">
                                                                                                        <div className="text-end">
                                                                                                            {/*<span className="d-block">{ orderDateString }</span>*/}
                                                                                                            {/*<span className="d-block">{ orderTimeString }</span>*/}
                                                                                                        </div>

                                                                                                        <div>
                                                                                                            <h5>Total</h5>
                                                                                                            <h4 className="price text-brand">
                                                                                                                CHF {order.total_order_amount.toFixed(2)}
                                                                                                            </h4>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className={activeIndex === 5 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Account Details</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <form onSubmit={profileFormSubmitHandler}>
                                                            <div className="row">
                                                                <div className="form-group col-md-6">
                                                                    <label>{t("account-first-name")}</label>
                                                                    <input className="form-control"
                                                                           name="fName"
                                                                           type="text"
                                                                           onChange={() => setProfileDataChanged(true)}
                                                                           defaultValue={currentUser.first_name} />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>{t("account-last-name")}</label>
                                                                    <input className="form-control"
                                                                           name="lName"
                                                                           type="text"
                                                                           onChange={() => setProfileDataChanged(true)}
                                                                           defaultValue={currentUser.last_name} />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>{t("account-username")}</label>
                                                                    <input className="form-control"
                                                                           name="username"
                                                                           type="text"
                                                                           onChange={() => setProfileDataChanged(true)}
                                                                           defaultValue={currentUser.username} />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>{t("account-email")}</label>
                                                                    <input className="form-control"
                                                                           name="email"
                                                                           type="email"
                                                                           value={currentUser.email}
                                                                           readOnly />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>{t("account-phone")}</label>
                                                                    <input className="form-control"
                                                                           name="phone"
                                                                           type="tel"
                                                                           onChange={() => setProfileDataChanged(true)}
                                                                           defaultValue={currentUser.phone} />
                                                                </div>
                                                               
                                                                { !showPassInput && <div className="link-primary mb-3 text-end" style={{ cursor: "pointer" }} onClick={() => setShowPassInput(true)}>{t("account-pw-change")}</div>}
                                                                { showPassInput && (
                                                                    <>
                                                                        <div className="form-group col-md-12">
                                                                            <label>{t("account-pw-new")}</label>
                                                                            <input required={passwordChangeActive}
                                                                                   className="form-control"
                                                                                   name="newPassword"
                                                                                   type="password"
                                                                                   onChange={e => setNewPass(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group col-md-12">
                                                                            <label>{t("account-pw-confirm")}</label>
                                                                            <input required={passwordChangeActive}
                                                                                   className="form-control"
                                                                                   name="confirmPassword"
                                                                                   type="password"
                                                                                   onChange={e => setConfirmPass(e.target.value)} />
                                                                        </div>
                                                                    </>
                                                                )}
                                                                { !!(profileError && !passwordError) && <small className="text-danger mb-2">{ profileError }</small> }
                                                                { !!(passwordError && !profileError) && <small className="text-danger mb-2">{ passwordError }</small> }
                                                                { !!(passwordError && profileError) && <small className="text-danger mb-2">Invalid profile details and password</small> }
                                                                { !!(showPassInput && triedPassSubmit) && <small className="text-danger mb-3">Password doesn't match</small> }
                                                                <div className="col-md-12">
                                                                    <button type="submit" className="btn btn-fill-out submit font-weight-bold me-3" name="submit" value="Submit">{t("account-save-change")}</button>
                                                                    { (triedSubmit && success) && <small className="text-success">Saved!</small> }
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

const mapStateToProps = state => ({
   products: state.products.items,
});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
