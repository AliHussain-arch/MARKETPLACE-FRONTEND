import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import itemServices from '../../../services/itemServices'; 

const  ProfileItemForm = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: null,
    image: "",
  });

  useEffect(() => {
    async function fetchItemDetail() {
      try {
        const itemData = await itemServices.getItem(userId, itemId);
        const item = itemData.item[0];
        setFormData({
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          image: item.image,
        });
      } catch (error) {
        console.log("Error fetching item details:", error);
      }
    }
    fetchItemDetail();
  }, [userId, itemId]);

  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      await itemServices.updateItem(userId, itemId, formData);
      navigate(`/user/${userId}/profile`);
    } catch (error) {
      console.log("Error updating item:", error);
    }
  }

  return (
    <section className="formSection">
      <div className='formContainer'>
        <h1>Edit Item</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="itemName">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Item Name"
              onChange={handleFormData}
              value={formData.name}
              required
            />
          </div>
          <div className="itemDescription">
            <label htmlFor="description">Item Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Item Description"
              onChange={handleFormData}
              value={formData.description}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleFormData}
              required
            >
              <option value="">Select a category</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Art">Art</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="itemPrice">
            <label htmlFor="price">Item Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Item Price"
              onChange={handleFormData}
              value={formData.price}
              required
            />
          </div>
          <div className="submitButton">
            <button type="submit">Update Item</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileItemForm;