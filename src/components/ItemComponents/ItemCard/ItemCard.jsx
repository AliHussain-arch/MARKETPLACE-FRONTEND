import { Link } from 'react-router-dom';
import authenticationServices from '../../../services/authenticationServices';

export default function ItemCard({ item }) {
    const user = authenticationServices.getUser();
    return (
        <div className="itemCard">
            <div className="itemHeader">
                <h1 className="itemName">{item.name}</h1>
                <h2 className="itemCategory">{item.category}</h2>
            </div>
            <div className="itemImage">
                <img src={item.image} alt={`${item.name} image`} />
            </div>
            <div className="itemDetails">
                <p className="itemDescription">{item.description}</p>
                <p className="itemPrice">${item.price}</p>
                <p className="itemSeller">Seller: {item.seller.username}</p>
                {item.buyer ? <p className="itemSeller">Buyer: {item.buyer.username}</p> : <></>}
            </div>
            <div className="itemBuyButton">
                <button>BUY</button>
            </div>
        </div>
    );
}
