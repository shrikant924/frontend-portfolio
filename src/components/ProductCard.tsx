import AddCartbtn from "./AddCartBtn"

export const ProductCard = ({ product }: any) => {
    return (
        <>
            <div className="card-wrapper">
                <div className="image-logo"><img src='https://picsum.photos/200/300' alt="not found" /></div>
                <div className="brand">{product.brand}</div>
                <div className="description">{product.description}</div>
                <div className="price"><label htmlFor="">Price : </label>{" "}{product.price} <label htmlFor=""> Rupees</label></div>
                <div className="stock"><label htmlFor="">Stock : </label> {" "}{product.stock} <label htmlFor="">Qty</label></div>
                <div><AddCartbtn /></div>
            </div>
        </>
    )
}

