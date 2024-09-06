import './ItemDetail.css';
import itemServices from '../../../services/itemServices';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function ItemDetail() {
    const params = useParams();
    const { userId, itemId } = params;
    const [item, setItem] = useState(null);

    useEffect(() => {
        async function fetchItem() {
            try {
                const itemData = await itemServices.getItem(userId, itemId);
                setItem(itemData.item[0]);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchItem();
    }, [userId, itemId]);

    if (!item) {
        return <h1>Loading...</h1>;
    }

    return (
       <div>
            <div className="itemDetail">
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
                    <p className="itemSeller">Seller: {item.seller}</p>
                </div>
                <div className="itemBuyButton">
                    <button>BUY</button>
                </div>
            </div>
        </div> 
    );
}
