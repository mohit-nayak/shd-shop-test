import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const {t} = useTranslation();

    const handleSearch = () => {
        console.log("click");
        router.push({
            pathname: "/shop",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    return (
        <>
            <form>
                {/*<select className="select-active">
                    <option>All Categories</option>
                    <option>Women's</option>
                    <option>Men's</option>
                    <option>Cellphones</option>
                    <option>Computer</option>
                    <option>Electronics</option>
                    <option> Accessories</option>
                    <option>Home & Garden</option>
                    <option>Luggage</option>
                    <option>Shoes</option>
                    <option>Mother & Kids</option>
                </select>*/}
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder={t("search-placeholder")}
                />
            </form>
        </>
    );
};

export default Search;
