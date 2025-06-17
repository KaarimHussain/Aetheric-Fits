"use client"

import { useState } from "react"
import "../css/Orders.css"

interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  size: string
  color: string
}

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  trackingNumber?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: {
    type: string
    last4?: string
  }
}

export default function OrdersView() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-12345",
      date: "2023-06-10",
      status: "delivered",
      total: 7500,
      items: [
        {
          id: "ITEM-1",
          name: "Premium Cotton T-Shirt",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
          price: 2500,
          quantity: 2,
          size: "M",
          color: "White",
        },
        {
          id: "ITEM-2",
          name: "Classic Denim Jeans",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60",
          price: 3500,
          quantity: 1,
          size: "32",
          color: "Blue",
        },
      ],
      trackingNumber: "TRK-9876543210",
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apartment 4B",
        city: "Karachi",
        state: "Sindh",
        zipCode: "75300",
        country: "Pakistan",
      },
      paymentMethod: {
        type: "Credit Card",
        last4: "4242",
      },
    },
    {
      id: "ORD-12346",
      date: "2023-06-15",
      status: "shipped",
      total: 5500,
      items: [
        {
          id: "ITEM-3",
          name: "Casual Sneakers",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60",
          price: 5500,
          quantity: 1,
          size: "9",
          color: "White",
        },
      ],
      trackingNumber: "TRK-9876543211",
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apartment 4B",
        city: "Karachi",
        state: "Sindh",
        zipCode: "75300",
        country: "Pakistan",
      },
      paymentMethod: {
        type: "PayPal",
      },
    },
    {
      id: "ORD-12347",
      date: "2023-06-20",
      status: "processing",
      total: 8500,
      items: [
        {
          id: "ITEM-4",
          name: "Formal Blazer",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
          price: 8500,
          quantity: 1,
          size: "L",
          color: "Black",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apartment 4B",
        city: "Karachi",
        state: "Sindh",
        zipCode: "75300",
        country: "Pakistan",
      },
      paymentMethod: {
        type: "Credit Card",
        last4: "1234",
      },
    },
  ])

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "status-processing"
      case "shipped":
        return "status-shipped"
      case "delivered":
        return "status-delivered"
      case "cancelled":
        return "status-cancelled"
      default:
        return "status-processing"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        )
      case "shipped":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16,8 20,8 23,11 23,16 16,16" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        )
      case "delivered":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22,4 12,14.01 9,11.01" />
          </svg>
        )
      case "cancelled":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )
      default:
        return null
    }
  }

  const handleReorder = (order: Order) => {
    // Here you would typically add all items from this order to the cart
    alert(`Reordering items from order ${order.id}`)
  }

  const handleTrackOrder = (trackingNumber: string) => {
    // Here you would typically redirect to a tracking page or open a tracking modal
    alert(`Tracking order with number: ${trackingNumber}`)
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your order history</p>
        </div>

        <div className="orders-content">
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-id">Order #{order.id}</h3>
                      <p className="order-date">Placed on {formatDate(order.date)}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <div className="item-specs">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="item-price">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">
                    <div className="order-total">
                      <span>Total: {formatPrice(order.total)}</span>
                    </div>
                    <div className="order-actions">
                      {order.trackingNumber && (
                        <button
                          className="track-button"
                          onClick={() => handleTrackOrder(order.trackingNumber!)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Track Order
                        </button>
                      )}
                      <button
                        className="details-button"
                        onClick={() => setActiveOrderId(activeOrderId === order.id ? null : order.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                        {activeOrderId === order.id ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        className="reorder-button"
                        onClick={() => handleReorder(order)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                        </svg>
                        Reorder
                      </button>
                    </div>
                  </div>

                  {/* Order Details */}
                  {activeOrderId === order.id && (
                    <div className="order-details">
                      <div className="details-grid">
                        <div className="detail-section">
                          <h4>Shipping Address</h4>
                          <div className="address-info">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                          </div>
                        </div>

                        <div className="detail-section">
                          <h4>Payment Method</h4>
                          <div className="payment-info">
                            <p>{order.paymentMethod.type}</p>
                            {order.paymentMethod.last4 && (
                              <p>**** **** **** {order.paymentMethod.last4}</p>
                            )}
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div className="detail-section">
                            <h4>Tracking Information</h4>
                            <div className="tracking-info">
                              <p>Tracking Number: {order.trackingNumber}</p>
                              <button
                                className="track-link"
                                onClick={() => handleTrackOrder(order.trackingNumber!)}
                              >
                                Track Package
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="detail-section">
                          <h4>Order Summary</h4>
                          <div className="summary-breakdown">
                            <div className="summary-line">
                              <span>Subtotal:</span>
                              <span>{formatPrice(order.total - 200)}</span>
                            </div>
                            <div className="summary-line">
                              <span>Shipping:</span>
                              <span>{formatPrice(200)}</span>
                            </div>
                            <div className="summary-line total">
                              <span>Total:</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
              </div>
              <h3>No orders yet</h3>
              <p>When you place your first order, it will appear here.</p>
              <button className="shop-now-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
