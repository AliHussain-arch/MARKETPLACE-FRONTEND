import itemServices from '../../../services/itemServices';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CommentList from '../../Comments/CommentList/CommentList';
import wishlistServices from '../../../services/wishlistServices';
import profileServices from '../../../services/profileServices';

export default function ItemDetail({user}) {
    const navigate = useNavigate();
    const params = useParams();
    const { userId, itemId } = params;
    const [item, setItem] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [profileId, setProfileId] = useState(null); 
    const [wishMessage, setwishMessage] = useState("");

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

    const handleAddToWishlist = async () => {
        if (!profileId) {
            console.log('Profile ID is not available');
            return;
        }
        try {
            await wishlistServices.addToWishlist(profileId, itemId); 
            setwishMessage('Item added to wishlist!');
        } catch (error) {
            setwishMessage('Item could not be added to wishlist');
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
        async function fetchProfile() {
            try {
                const profileData = await profileServices.getProfile(userId);
                setProfileId(profileData.profile._id); 
            } catch (error) {
                console.log("Error fetching profile:", error);
            }
        }
    
        fetchItem();
        fetchProfile();
    }, [userId, itemId, trigger]);

    if (!item) {
        return <h1>Loading...</h1>;
    }

    return (
       <div className="content">
       <section className="itemDetailSection">
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
                    <button onClick={handleAddToWishlist}>Add to Wishlist</button>
                </div>
                {wishMessage && <p>{wishMessage}</p>}
            </div>
            <section className="commentSection">
                <CommentList item={item} setItem={setItem} itemId={itemId} userId={userId} user={user} trigger={trigger} setTrigger={setTrigger} />
            </section>
        </section> 
        </div>
    );
}
