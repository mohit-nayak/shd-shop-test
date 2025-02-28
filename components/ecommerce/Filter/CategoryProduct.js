import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getCategories } from "../../../rest/calls";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

const CategoryProduct = ({ updateProductCategory }) => {
    const [categories, setCategories] = useState([]);
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
        getCategories()
            .then(res => {
                setCategories(res);
            });
    }, []);

    useEffect(() => {
        const cat = query.category ? query.category : "";

        if (categories.length > 0) {
            setActive(cat);
            updateProductCategory(cat);
        }
    }, [categories, query]);

    return (
        <>
            <ul>
                
                { !!categories.length && categories.map(cat => (
                    <li onClick={(e) => selectCategory(e, cat.slug)} key={cat.slug}
                        className={active === cat.slug ? "active" : ""}>
                        <a>
                            
                            { cat.name }
                        </a>
                        {/*<span className="count">30</span>*/}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
