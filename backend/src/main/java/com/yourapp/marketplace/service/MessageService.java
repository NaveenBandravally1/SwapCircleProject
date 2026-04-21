package com.yourapp.marketplace.service;

import com.yourapp.marketplace.model.Message;
import com.yourapp.marketplace.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository repo;

    public MessageService(MessageRepository repo) {
        this.repo = repo;
    }

    public Message send(Message message) {
        return repo.save(message);
    }

    public List<Message> getMessagesForItem(Long itemId) {
        return repo.findByItemId(itemId);
    }

    public List<Message> getAllMessages() {
        return repo.findAll();
    }
}
