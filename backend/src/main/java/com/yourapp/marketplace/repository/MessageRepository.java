package com.yourapp.marketplace.repository;

import com.yourapp.marketplace.model.Message;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class MessageRepository {

    private final List<Message> messages = new ArrayList<>();
    private Long idCounter = 1L;

    public Message save(Message message) {
        message.setId(idCounter++);
        messages.add(message);
        return message;
    }

    public List<Message> findByItemId(Long itemId) {
        return messages.stream()
                .filter(m -> itemId.equals(m.getItemId()))
                .collect(Collectors.toList());
    }

    public List<Message> findAll() {
        return new ArrayList<>(messages);
    }
}
