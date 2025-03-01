import React from "react";

import Link from "next/link";

const BlogGrid = ({ show, wide }) => {
    var data = [
        {
            id: 1,
            title: "Wieviel Hundefutter gut ist",
            category: "Hundefutter",
            views: 126,
            date: "27. Mai 2022",
            img: "hunde-blog-1.png",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
       
    ];

    return (
        <>
            {data.slice(0, show).map((item, i) => (
                <article key={i}
                    className={
                        wide
                            ? "col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated"
                            : "col-xl-4 col-lg-6 col-md-6 text-center hover-up mb-30 animated"
                    }
                >
                    <div className="post-thumb">
                        <Link href="/hunde-blog-detail">
                            
                                <img
                                    className="border-radius-15"
                                    src={`/assets/imgs/blog/${item.img}`}
                                    alt=""
                                />
                           
                        </Link>
                        <div className="entry-meta">
                            <Link className="entry-meta meta-2" href="/blog-category-grid">
                               
                                    <i className="fi-rs-heart"></i>
                                
                            </Link>
                        </div>
                    </div>
                    <div className="entry-content-2">
                        <h6 className="mb-10 font-sm">
                            <Link className="entry-meta text-muted" href="/blog-category-grid">
                                
                                    {item.category}
                               
                            </Link>
                        </h6>
                        <h4 className="post-title mb-15">
                            <Link href="/blog-post-right">
                                {item.title}
                                </Link>
                        </h4>
                        <div className="entry-meta font-xs color-grey mt-10 pb-10">
                            <div>
                                <span className="post-on mr-10">{item.date}</span>
                                <span className="hit-count has-dot mr-10">
                                    {item.views} gesehen
                                </span>
                                <span className="hit-count has-dot">
                                    4min Lesezeit
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export default BlogGrid;
