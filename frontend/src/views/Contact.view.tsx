"use client";

import type React from "react";

import { useState } from "react";
import "../css/Contact.css";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactView() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 5000);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "Call Us",
      details: ["+92 300 1234567", "+92 21 1234567", "Mon-Sat 9AM-8PM"],
      action: "Call Now",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Email Us",
      details: [
        "hello@fraxonfits.com",
        "support@fraxonfits.com",
        "We reply within 24 hours",
      ],
      action: "Send Email",
    },
  ];

  const faqs = [
    {
      question: "What are your shipping options?",
      answer:
        "We offer free shipping on orders over PKR 5,000. Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days for an additional fee.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all items in original condition with tags attached. Returns are free, and we provide a prepaid return label.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section of your account.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only ship within Pakistan. We're working on expanding our shipping to other countries soon. Stay tuned for updates!",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us via phone, email, or the contact form on this page. Our customer support team is available Monday to Saturday, 9 AM to 8 PM.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="">
            <h1 className="dark-hero-title">Get in Touch</h1>
            <p className="dark-hero-subtitle">
              Have questions about our products or need assistance? We're here
              to help! Reach out to us through any of the channels below.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <section className="contact-info-section">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="info-icon">{info.icon}</div>
                <h3 className="info-title">{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
                <button className="info-action">{info.action}</button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="contact-form-section">
          <div className="form-map-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="shipping">Shipping Information</option>
                      <option value="product">Product Question</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22,2 15,22 11,13 2,9" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="form-message success">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="form-message error">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    Sorry, there was an error sending your message. Please try
                    again.
                  </div>
                )}
              </form>
            </div>

            {/* Map */}
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Find Us Here</h3>
                <p>123 Fashion Street, Karachi, Pakistan</p>
                <button className="map-button">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open in Maps
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find quick answers to common questions about our products and
              services.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="faq-icon"
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Hours */}
        <section className="hours-section">
          <div className="hours-container">
            <div className="hours-content">
              <h3 className="hours-title">Business Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="day">Monday - Friday</span>
                  <span className="time">9:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Saturday</span>
                  <span className="time">10:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Sunday</span>
                  <span className="time">Closed</span>
                </div>
              </div>
            </div>
            <div className="hours-note">
              <div className="note-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <p>
                <strong>Holiday Hours:</strong> We may have special hours during
                holidays. Please call ahead or check our social media for
                updates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
