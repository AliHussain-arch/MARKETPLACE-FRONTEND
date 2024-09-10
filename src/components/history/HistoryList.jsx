import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryServices from "../../services/historyServices";

const HistoryList = () => {
  const { userId, profileId } = useParams();
  const [history, setHistory] = useState({ boughtItems: [], soldItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!profileId) {
        setError("Profile ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await HistoryServices.getHistory(userId, profileId);
        setHistory(data);
      } catch (err) {
        setError(err.message || "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, profileId]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="content">
      <section className="historySection">
      <div className="history">
      <h1>History</h1>
      <section className="boughtItems">
        <h2>Bought Items</h2>
        {history.boughtItems.length > 0 ? (
          <div>
            {history.boughtItems.map((item) => (
              <div className="itemCard" key={item._id}>
                <div className="itemHeader">
                  <h3>{item.name}</h3>
                </div>
                <p>Price: ${item.price}</p>
                <p>Bought On: {formatDate(item.createdAt)}</p>
                <div className="itemImage">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bought items found.</p>
        )}
      </section>
      <section className="soldItems">
        <h2>Sold Items</h2>
        {history.soldItems.length > 0 ? (
          <div>
            {history.soldItems.map((item) => (
              <div className="itemCard" key={item._id}>
                <div className="itemHeader">
                  <h3>{item.name}</h3>
                </div>
                <p>Price: ${item.price}</p>
                <p>Sold On: {formatDate(item.createdAt)}</p>
                <p>Buyer: {item.buyer.username}</p>
                <div className="itemImage">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No sold items found.</p>
        )}
      </section>
      </div>
      </section>
    </div>
  );
};

export default HistoryList;
