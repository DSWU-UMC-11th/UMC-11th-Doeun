package com.umc.studyumc.controller;

import com.umc.studyumc.dto.BookResponse;
import com.umc.studyumc.dto.CreateBookRequest;
import com.umc.studyumc.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public List<BookResponse> getBooks(){
        return bookService.getAllBooks();
    }

    @PostMapping("/books")
    @ResponseStatus(HttpStatus.CREATED)
    public BookResponse createBook(@Valid @RequestBody CreateBookRequest request){
        return bookService.createBook(request);
    }

    @GetMapping("/books/category/{categoryId}")
    public List<BookResponse> getBookCategory(@PathVariable Long categoryId){
        return bookService.getBooksByCategoryId(categoryId);
    }
}
