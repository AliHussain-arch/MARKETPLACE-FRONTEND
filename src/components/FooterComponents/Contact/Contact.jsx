import contactSerivce from "../../../services/contactSerivce";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitted(true); 
      await contactSerivce.createContact(formData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="content">
      {isSubmitted ? (
        <div className="success-message">
          <h1>Success!</h1>
          <p>Message Sent Successfully!</p>
        </div>
      ) : (
        <section className="formSection">
          <div className="formContainer">
            <form onSubmit={handleFormSubmit}>
              <h2>Contact</h2>
              <div className="input-box">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  onChange={handleFormData}
                  value={formData.name}
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleFormData}
                  value={formData.email}
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Enter the subject of the email"
                  onChange={handleFormData}
                  value={formData.subject}
                  required
                />
              </div>

              <div className="input-box">
                <label>Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  onChange={handleFormData}
                  value={formData.message}
                  required
                ></textarea>
              </div>
              <div className="submitButton">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
