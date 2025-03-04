import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const PriceRangeSlider = ({ updateProductFilters }) => {
    // console.log(updateProductFilters);

    const Router = useRouter();
    const searchTerm = Router.query.search;

    const [price, setPrice] = useState({ value: { min: 0, max: 150 } });

    useEffect(() => {
        const filters = {
            price: price.value,
        };

        updateProductFilters(filters);
    }, [price, searchTerm]);

    return (
        <>
            <InputRange
                formatLabel={(value) => `CHF ${value}`}
                maxValue={150}
                minValue={0}
                value={price.value}
                onChange={(value) => setPrice({ value })}
            />

            
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(PriceRangeSlider);
