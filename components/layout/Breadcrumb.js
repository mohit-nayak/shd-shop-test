import React from "react";

import Link from "next/link"

const Breadcrumb = ({parent, sub, subChild, category, catSlug, noBreadcrumb}) => {
    return (
        <>
            <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">
                            {parent}
                                             </Link>
                        <span></span><Link href="/shop">{sub}</Link>
                        <span></span><Link href={`/shop/${catSlug}`}>{category}</Link>
                        <span></span> {subChild}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Breadcrumb;
