package com.yourapp.marketplace.controller;

import com.yourapp.marketplace.model.Message;
import com.yourapp.marketplace.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public Message send(@RequestBody Message message) {
        return service.send(message);
    }

    @GetMapping("/item/{itemId}")
    public List<Message> getByItem(@PathVariable Long itemId) {
        return service.getMessagesForItem(itemId);
    }

    @GetMapping
    public List<Message> getAll() {
        return service.getAllMessages();
    }
}
