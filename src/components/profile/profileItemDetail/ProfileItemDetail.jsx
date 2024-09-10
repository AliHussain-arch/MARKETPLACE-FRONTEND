import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import itemServices from '../../../services/itemServices'; 

const ProfileItemDetail = () => {
    const { userId, itemId } = useParams();
    const [itemDetail, setItemDetail] = useState(null);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        async function fetchItemDetail() {
            try {
                const itemData = await itemServices.getItem(userId, itemId);
                setItemDetail(itemData.item[0]);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchItemDetail();
    }, [userId, itemId]);

    const handleDelete = async () => {
        try {
            await itemServices.deleteItem(userId, itemId);
            navigate(`/user/${userId}/profile`);
        } catch (error) {
            console.log("Error deleting item:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/user/${userId}/item/${itemId}/edit`); 
    };

    if (!itemDetail) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="item-detail-container">
            <h1>{itemDetail.name}</h1>
            <img src={itemDetail.image} alt={itemDetail.name} width="200" />
            <p><strong>Price: </strong>{itemDetail.price}</p>
            <p><strong>Description: </strong>{itemDetail.description}</p>
            <p><strong>Category: </strong>{itemDetail.category}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProfileItemDetail;
