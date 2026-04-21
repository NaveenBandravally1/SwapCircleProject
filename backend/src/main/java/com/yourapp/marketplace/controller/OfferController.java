package com.yourapp.marketplace.controller;

import com.yourapp.marketplace.model.Offer;
import com.yourapp.marketplace.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin
public class OfferController {

    private final OfferService service;

    public OfferController(OfferService service) {
        this.service = service;
    }

    @PostMapping
    public Offer createOffer(@RequestBody Offer offer) {
        return service.createOffer(offer);
    }

    @PutMapping("/{id}/status")
    public Offer updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    @GetMapping("/item/{itemId}")
    public List<Offer> getByItem(@PathVariable Long itemId) {
        return service.getOffersForItem(itemId);
    }

    @GetMapping
    public List<Offer> getAll() {
        return service.getAllOffers();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleNotFound(IllegalArgumentException ex) {
        return ResponseEntity.notFound().build();
    }
}
