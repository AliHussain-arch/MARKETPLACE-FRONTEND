import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import itemServices from "../../../services/itemServices";

const ProfileItemForm = () => {
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

    if (name === "image") {
      setFormData({ ...formData, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      let data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("image", formData.image);

      await itemServices.updateItem(userId, itemId, data);

      navigate(`/user/${userId}/profile`);
    } catch (error) {
      console.log("Error updating item:", error);
    }
  }

  return (
    <section className="formSection">
      <div className="formContainer">
        <h1>Edit Item</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="itemName">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter item name"
              onChange={handleFormData}
              value={formData.name}
              required
            />
          </div>
          <div className="itemDescription">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Enter Item Description"
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
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Item's Price"
              onChange={handleFormData}
              value={formData.price}
              required
            />
          </div>
          <label htmlFor="image">Item Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFormData}
          />

          <div className="submitButton">
            <button type="submit">Update Item</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileItemForm;
