import './ItemDetail.css';
import itemServices from '../../../services/itemServices';

export default function ItemDetail() {
    return (
      <>
        <div className="itemHeader">
                <h1 className="itemName">item.name</h1>
                <h2 className="itemCategory">item.category</h2>
            </div>
            <div className="itemImage">
                <img src='' alt={`image`} />
            </div>
            <div className="itemDetails">
                <p className="itemDescription">item.description</p>
                <p className="itemPrice">$item.price</p>
                <p className="itemSeller">Seller: item.seller</p>
            </div>
            <div className="itemBuyButton">
                <button>BUY</button>
            </div>
      </>
    );
  };