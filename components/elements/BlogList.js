import React from "react";
import Link from "next/link";

const BlogList = ({ show }) => {
    var data = [
        {
            id: 1,
            title: "The litigants on the screen are not actors",
            category: "Politic",
            views: 12,
            date: "25 April 2021",
            img: "blog-1.png",
            desc: "These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.",
        },
        
    ];

    return (
        <>
            {data.slice(0, show).map((item, i) => (
                <article className="wow fadeIn animated hover-up mb-30" key={i}>
                    <div
                        className="post-thumb"
                        style={{
                            backgroundImage: `url(/assets/imgs/blog/${item.img})`,
                        }}
                    >
                        <div className="entry-meta">
                            <Link className="entry-meta meta-2" href="/blog-category-grid">
                                asdfasdf
                            </Link>
                        </div>
                    </div>
                    <div className="entry-content-2">
                        <h3 className="post-title mb-15">
                            <Link href="/blog-post-right">
                              
                                    Ettitude — Beautifully Designed Bamboo
                                    Sheets & Sleep Wear-Home Décor Holiday Gift
                                    Guide
                                
                            </Link>
                        </h3>
                        <p className="post-exerpt mb-30">
                            These people envy me for having a lifestyle they
                            don’t have, but the truth is, sometimes I envy their
                            lifestyle instead. Struggling to sell one
                            multi-million dollar home currently.
                        </p>
                        <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                            <div>
                                <span className="post-on">
                                    {" "}
                                    <i className="fi-rs-clock"></i> 25 April
                                    2021
                                </span>
                                <span className="hit-count has-dot">
                                    126k Views
                                </span>
                            </div>
                            <Link className="text-brand" href="/blog-post-right">
                                
                                    Read more{" "}
                                    <i className="fi-rs-arrow-right"></i>
                                
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export default BlogList;
