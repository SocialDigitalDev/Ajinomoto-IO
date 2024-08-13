import React from "react";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        chaordic?: string;
    }
}

const ShelfBottomLinx = () => {

    return (
        <>
            {/* <!-- Linx BOTTOM --> */}
            
            <div chaordic="bottom"></div>
        </>
    );

}

export default ShelfBottomLinx;