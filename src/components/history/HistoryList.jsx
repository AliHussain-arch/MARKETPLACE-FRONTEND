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
    <div>
      <h1>History</h1>
      <section>
        <h2>Bought Items</h2>
        {history.boughtItems.length > 0 ? (
          <ul>
            {history.boughtItems.map((item) => (
              <li key={item._id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Bought On: {formatDate(item.createdAt)}</p>
                <img src={item.image} alt={item.name} width="100" />
              </li>
            ))}
          </ul>
        ) : (
          <p>No bought items found.</p>
        )}
      </section>
      <section>
        <h2>Sold Items</h2>
        {history.soldItems.length > 0 ? (
          <ul>
            {history.soldItems.map((item) => (
              <li key={item._id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Sold On: {formatDate(item.createdAt)}</p>
                <p>Buyer: {item.buyer.username}</p>
                <img src={item.image} alt={item.name} width="100" />
              </li>
            ))}
          </ul>
        ) : (
          <p>No sold items found.</p>
        )}
      </section>
    </div>
  );
};

export default HistoryList;
