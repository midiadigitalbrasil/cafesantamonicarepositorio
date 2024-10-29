import React from "react";


const ProductSummaryPreventClick = () => {
    const stopBubblingUp = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            onClick={stopBubblingUp}
            className="absolute w-100 h-100 left-0 top-0"
            style={{ cursor: 'default' }}
        >

        </div >
    );
};

export default ProductSummaryPreventClick