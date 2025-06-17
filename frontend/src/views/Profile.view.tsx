"use client"

import { useState } from "react"
import "../css/Profile.css"

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+92 300 1234567",
    birthDate: "1990-01-15",
    gender: "male",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newsletter: true,
    smsNotifications: false,
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      isDefault: true,
      name: "John Doe",
      phone: "+92 300 1234567",
      address: "123 Main Street, Apartment 4B",
      city: "Karachi",
      state: "Sindh",
      zipCode: "75300",
      country: "Pakistan",
    },
    {
      id: 2,
      type: "Office",
      isDefault: false,
      name: "John Doe",
      phone: "+92 300 7654321",
      address: "456 Business Avenue, Floor 7",
      city: "Karachi",
      state: "Sindh",
      zipCode: "75600",
      country: "Pakistan",
    },
  ])

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null)
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    isDefault: false,
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile data to your backend
    setIsEditing(false)
    // Show success message
    alert("Profile updated successfully!")
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingAddressId) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddressId ? { ...newAddress, id: editingAddressId } : addr
        )
      )
    } else {
      // Add new address
      const id = Math.max(0, ...addresses.map((a) => a.id)) + 1
      setAddresses([...addresses, { ...newAddress, id }])
    }
    
    setShowAddressForm(false)
    setEditingAddressId(null)
    setNewAddress({
      type: "Home",
      isDefault: false,
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Pakistan",
    })
  }

  const handleEditAddress = (id: number) => {
    const addressToEdit = addresses.find((addr) => addr.id === id)
    if (addressToEdit) {
      setNewAddress({ ...addressToEdit })
      setEditingAddressId(id)
      setShowAddressForm(true)
    }
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Account</h1>
          <p className="profile-subtitle">Manage your account details and preferences</p>
        </div>

        <div className="profile-content">
          {/* Profile Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-user">
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <div className="profile-user-info">
                <h3>{formData.firstName} {formData.lastName}</h3>
                <p>{formData.email}</p>
              </div>
            </div>

            <div className="profile-tabs">
              <button
                className={`profile-tab ${activeTab === "personal" ? "active" : ""}`}
                onClick={() => setActiveTab("personal")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Personal Information
              </button>
              <button
                className={`profile-tab ${activeTab === "addresses" ? "active" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Addresses
              </button>
              <button
                className={`profile-tab ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Security
              </button>
              <button
                className={`profile-tab ${activeTab === "preferences" ? "active" : ""}`}
                onClick={() => setActiveTab("preferences")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Preferences
              </button>
            </div>

            <div className="profile-actions">
              <button className="logout-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Profile Main Content */}
          <div className="profile-main">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  {!isEditing ? (
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthDate">Date of Birth</label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button type="submit" className="save-button">
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>My Addresses</h2>
                  <button className="add-button" onClick={() => {
                    setShowAddressForm(true)
                    setEditingAddressId(null)
                    setNewAddress({
                      type: "Home",
                      isDefault: false,
                      name: "",
                      phone: "",
                      address: "",
                      city: "",
                      state: "",
                      zipCode: "",
                      country: "Pakistan",
                    })
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add New Address
                  </button>
                </div>

                {showAddressForm ? (
                  <div className="address-form-container">
                    <h3>{editingAddressId ? "Edit Address" : "Add New Address"}</h3>
                    <form onSubmit={handleSaveAddress} className="address-form">
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="addressType">Address Type</label>
                          <select
                            id="type"
                            name="type"
                            value={newAddress.type}
                            onChange={handleAddressChange}
                            required
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="isDefault"
                              checked={newAddress.isDefault}
                              onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            />
                            <span className="checkbox-custom"></span>
                            Set as default address
                          </label>
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={newAddress.name}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={newAddress.phone}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group full-width">
                          <label htmlFor="address">Street Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={newAddress.address}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={newAddress.city}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="state">State/Province</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={newAddress.state}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="zipCode">Postal/Zip Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={newAddress.zipCode}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={newAddress.country}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={() => setShowAddressForm(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="save-button">
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="addresses-list">
                    {addresses.map((address) => (
                      <div key={address.id} className={`address-card ${address.isDefault ? "default" : ""}`}>
                        {address.isDefault && <div className="default-badge">Default</div>}
                        <div className="address-type">{address.type}</div>
                        <div className="address-details">
                          <p className="address-name">{address.name}</p>
                          <p className="address-phone">{address.phone}</p>
                          <p className="address-text">{address.address}</p>
                          <p className="address-location">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="address-country">{address.country}</p>
                        </div>
                        <div className="address-actions">
                          <button
                            className="address-edit"
                            onClick={() => handleEditAddress(address.id)}
                          >
                            Edit
                          </button>
                          {!address.isDefault && (
                            <>
                              <button
                                className="address-default"
                                onClick={() => handleSetDefaultAddress(address.id)}
                              >
                                Set as Default
                              </button>
                              <button
                                className="address-delete"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Security Settings</h2>
                </div>

                <div className="security-section">
                  <h3>Change Password</h3>
                  <form className="password-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-button">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="security-section">
                  <h3>Login Sessions</h3>
                  <div className="sessions-list">
                    <div className="session-item current">
                      <div className="session-info">
                        <div className="session-device">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                          <span>MacBook Pro</span>
                        </div>
                        <div className="session-details">
                          <p>Karachi, Pakistan • Current Session</p>
                          <p className="session-time">Last active: Just now</p>
                        </div>
                      </div>
                    </div>
                    <div className="session-item">
                      <div className="session-info">
                        <div className="session-device">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                          <span>iPhone 13</span>
                        </div>
                        <div className="session-details">
                          <p>Karachi, Pakistan</p>
                          <p className="session-time">Last active: 2 hours ago</p>
                        </div>
                      </div>
                      <button className="session-logout">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Preferences</h2>
                </div>

                <div className="preferences-section">
                  <h3>Notifications</h3>
                  <div className="preferences-options">
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Email Newsletter</h4>
                        <p>Receive updates about new products, sales, and fashion tips</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>SMS Notifications</h4>
                        <p>Get order updates and exclusive offers via text message</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="preferences-section">
                  <h3>Language & Currency</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="language">Language</label>
                      <select id="language" name="language">
                        <option value="en">English</option>
                        <option value="ur">Urdu</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <select id="currency" name="currency">
                        <option value="PKR">Pakistani Rupee (PKR)</option>
                        <option value="USD">US Dollar (USD)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="save-button">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
