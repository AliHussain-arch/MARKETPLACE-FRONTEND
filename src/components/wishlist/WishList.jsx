import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WishlistServices from "../../services/wishlistServices";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const { profileId } = useParams();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const wishlistData = await WishlistServices.getWishlist(profileId);
        setWishlist(wishlistData.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [profileId]);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await WishlistServices.removeFromWishlist(profileId, wishlistId);
      setWishlist(wishlist.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="content">
      <section className="wishlistSection">
        <div className="wishlist">
          <h1>Wishlist</h1>
          {wishlist.length === 0 ? (
            <p>No items in your wishlist</p>
          ) : (
            wishlist.map((item) => (
              <article key={item._id}>
                <h3>{item.item.name}</h3>
                <p>{item.item.description}</p>
                <p>Price: ${item.item.price}</p>
                <img src={item.item?.image} alt={item.item?.name} width="100" />
                <p>Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
                <button onClick={() => handleRemoveFromWishlist(item._id)}>
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default WishList;
