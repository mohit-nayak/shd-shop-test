import React from "react";
import Link from "next/link"
const Banner5 = () => {
    return (
        <>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay="0"
                >
                    <img src="/assets/imgs/banner/banner-1.png" alt="" />
                    <div className="banner-text">
                        <h4>
                            Bio  <br />
                            Hundefutter
                        </h4>
                        <Link className="btn btn-xs" href="/shop">
                            Kaufen <i className="fi-rs-arrow-small-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay=".2s"
                >
                    <img src="/assets/imgs/banner/banner-2.png" alt="" />
                    <div className="banner-text">
                        <h4>
                            Hundezubehör
                            <br />

                        </h4>
                        <Link className="btn btn-xs" href="/shop">
                            Kaufen <i className="fi-rs-arrow-small-right"></i>
                       </Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 d-md-none d-lg-flex">
                <div
                    className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".4s"
                >
                    <img src="/assets/imgs/banner/banner-3.png" alt="" />
                    <div className="banner-text">
                        <h4>
                            Hundebetten <br />

                        </h4>
                        <Link className="btn btn-xs" href="/shop">
                            Kaufen <i className="fi-rs-arrow-small-right"></i>
                       </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner5;
