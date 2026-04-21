package com.yourapp.marketplace.service;

import com.yourapp.marketplace.model.Item;
import com.yourapp.marketplace.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repo;

    public ItemService(ItemRepository repo) {
        this.repo = repo;
    }

    public Item createItem(Item item) {
        return repo.save(item);
    }

    public List<Item> getAllItems() {
        return repo.findAll();
    }

    public Item getItem(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found: " + id));
    }
}
