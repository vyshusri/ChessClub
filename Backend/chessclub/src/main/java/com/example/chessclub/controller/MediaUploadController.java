package com.example.chessclub.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class MediaUploadController {

    private final String uploadDirectory = "uploads/";

    @PostMapping(
        consumes = "multipart/form-data"
)
public ResponseEntity<?> uploadFile(
        @RequestPart("file") MultipartFile file) {

        try {

            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Please select a file.");
            }

            String contentType = file.getContentType();

            if (contentType == null ||
                    !contentType.startsWith("image/")) {

                return ResponseEntity.badRequest()
                        .body("Only image files are allowed.");
            }

            Path uploadPath =
                    Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalFileName != null &&
                    originalFileName.contains(".")) {

                extension =
                        originalFileName.substring(
                                originalFileName.lastIndexOf(".")
                        );
            }

            String fileName =
                    UUID.randomUUID().toString()
                            + extension;

            Path filePath =
                    uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            String fileUrl =
                    "http://localhost:8081/uploads/"
                            + fileName;

            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to upload image.");
        }
    }
}