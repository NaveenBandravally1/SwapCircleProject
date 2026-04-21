package com.yourapp.marketplace.service;

import com.yourapp.marketplace.model.Offer;
import com.yourapp.marketplace.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {

    private final OfferRepository repo;

    public OfferService(OfferRepository repo) {
        this.repo = repo;
    }

    public Offer createOffer(Offer offer) {
        offer.setStatus("PENDING");
        return repo.save(offer);
    }

    public Offer updateStatus(Long offerId, String status) {
        Offer offer = repo.findById(offerId)
                .orElseThrow(() -> new IllegalArgumentException("Offer not found: " + offerId));
        offer.setStatus(status);
        return offer;
    }

    public List<Offer> getOffersForItem(Long itemId) {
        return repo.findByItemId(itemId);
    }

    public List<Offer> getAllOffers() {
        return repo.findAll();
    }
}
