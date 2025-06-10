import React, { useState, useEffect } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  // Clear success message after 3 seconds
  useEffect(() => {
    let timer;
    if (status.submitted) {
      timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [status.submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedFormData);
    
    // Clear error for this field when user types
    if (errors[name]) {
      const updatedErrors = {
        ...errors,
        [name]: ""
      };
      
      setErrors(updatedErrors);
      
      // Check if all fields are now valid, and if so, clear the status error
      if (status.error && !Object.values(updatedErrors).some(error => error) && 
          updatedFormData.name && updatedFormData.email && updatedFormData.message) {
        setStatus(prev => ({ ...prev, error: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form with specific field errors
    const newErrors = {
      name: !formData.name ? "Name is required" : "",
      email: !formData.email ? "Email is required" : "",
      message: !formData.message ? "Message is required" : ""
    };
    
    setErrors(newErrors);
    
    // Check if any errors exist
    if (newErrors.name || newErrors.email || newErrors.message) {
      setStatus({
        submitting: false,
        submitted: false,
        error: "Please fill in all required fields"
      });
      return;
    }
    
    setStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Send email using the proxy endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Contact Form <webpres@cmpnd.cc>',
          to: ['admin@webpres.au'],
          subject: `New message from ${formData.name}`,
          text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          submitting: false,
          submitted: false,
          error: typeof result.error === 'object' ? 'Failed to send message. Please try again.' : result.error || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: "An unexpected error occurred. Please try again."
      });
      console.error("Contact form error:", error);
    }
  };

  return (
    <div className="contact-form">
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary sm">Let&apos;s create together</p>
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3>Start a Conversation</h3>

            <p>
              Have an idea in mind? Want to further develop your business? Reach out so we can explore how we can collaborate!
            </p>
          </div>

          <div className="contact-form-availability">
            <p className="primary sm">Available worldwide</p>
          </div>
        </div>

        <div className="contact-form-col">
          <form onSubmit={handleSubmit} className="contact-form-form">
            <div className="form-item">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
            </div>

            <div className="form-item">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
            </div>

            <div className="form-item">
              <textarea 
                name="message"
                rows={6} 
                placeholder="Message" 
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
              />
            </div>

            {status.error && (
              <div className="form-error">
                <p>{status.error}</p>
              </div>
            )}

            {status.submitted && (
              <div className="form-success">
                <p>Message sent successfully! We'll be in touch soon.</p>
              </div>
            )}

            <div className="form-item">
              <button 
                className="btn" 
                type="submit"
                disabled={status.submitting}
              >
                {status.submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
