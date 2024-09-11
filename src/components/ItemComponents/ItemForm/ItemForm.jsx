import itemServices from "../../../services/itemServices";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { userId } = params;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
    seller: userId,
  });

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

    let data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("seller", formData.seller);
    data.append("image", formData.image);

    await itemServices.createItem(userId, data);
    navigate(`/user/${userId}/item`);
  }

  return (
    <div className="content">
      <section className="formSection">
        <div className="formContainer">
          <h1>ItemForm</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Item name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Item Name"
              onChange={handleFormData}
              value={formData.name}
            />
            <label htmlFor="itemDescription">Item Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Item Description"
              onChange={handleFormData}
              value={formData.description}
              required
            />
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
            <label htmlFor="price">Item price</label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              placeholder="Item price"
              onChange={handleFormData}
              value={formData.price}
              required
            />
            <label htmlFor="image">Item Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFormData}
            />
            <div className="submitButton">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
