package com.yourapp.marketplace.repository;

import com.yourapp.marketplace.model.Offer;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class OfferRepository {

    private final Map<Long, Offer> offers = new HashMap<>();
    private Long idCounter = 1L;

    public Offer save(Offer offer) {
        offer.setId(idCounter++);
        offers.put(offer.getId(), offer);
        return offer;
    }

    public Optional<Offer> findById(Long id) {
        return Optional.ofNullable(offers.get(id));
    }

    public List<Offer> findByItemId(Long itemId) {
        return offers.values().stream()
                .filter(o -> itemId.equals(o.getItemId()))
                .collect(Collectors.toList());
    }

    public List<Offer> findAll() {
        return new ArrayList<>(offers.values());
    }
}
