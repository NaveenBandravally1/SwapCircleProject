package com.yourapp.marketplace.model;

public class Offer {
    private Long id;
    private Long itemId;
    private String buyer;
    private double offeredPrice;
    private String status; // PENDING / ACCEPTED / REJECTED

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public String getBuyer() { return buyer; }
    public void setBuyer(String buyer) { this.buyer = buyer; }
    public double getOfferedPrice() { return offeredPrice; }
    public void setOfferedPrice(double offeredPrice) { this.offeredPrice = offeredPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
