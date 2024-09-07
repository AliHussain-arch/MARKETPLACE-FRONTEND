import './ItemDetail.css';
import itemServices from '../../../services/itemServices';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CommentList from '../../Comments/CommentList/CommentList';

export default function ItemDetail({user}) {
    const navigate = useNavigate();
    const params = useParams();
    const { userId, itemId } = params;
    const [item, setItem] = useState(null);
    const [trigger, setTrigger] = useState(false);

    const handleBuying = async () => {
        if (userId === item.seller) {
            console.log('You cannot buy your own item');
            return;
        }
        try {
            await itemServices.updateItem(userId, itemId, { buyer: userId });
            navigate(`/user/${userId}/item`);
        } catch (error) {
            console.log(error);
        }
    };

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
    }, [userId, itemId, trigger]);

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
                    <button onClick={handleBuying}>BUY</button>
                </div>
            </div>
            <section className="commentSection">
                <CommentList item={item} setItem={setItem} itemId={itemId} userId={userId} user={user} trigger={trigger} setTrigger={setTrigger} />
            </section>
        </div> 
    );
}
