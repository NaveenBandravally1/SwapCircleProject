package com.yourapp.marketplace.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileStorageService {

    private static final String UPLOAD_DIR =
            System.getProperty("user.home") + "/swapcircle-uploads/";

    public String saveFile(MultipartFile file) throws IOException {
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.isBlank()) {
            throw new IllegalArgumentException("File must have a name");
        }

        // Strip path separators to prevent directory traversal
        String safeName = new File(originalName).getName();
        // Replace spaces with underscores to avoid URL encoding issues
        safeName = safeName.replaceAll("\\s+", "_");
        File dest = new File(dir, safeName);
        file.transferTo(dest);

        return "/images/" + safeName;
    }
}
