package com.umc.studyumc.service;

import com.umc.studyumc.dto.BookResponse;
import com.umc.studyumc.dto.CreateBookRequest;
import com.umc.studyumc.entity.Book;
import com.umc.studyumc.entity.Category;
import com.umc.studyumc.repository.BookRepository;
import com.umc.studyumc.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAllByOrderByBookIdDesc().stream()
                .map(BookResponse::from).toList();
    }

    @Transactional
    public BookResponse createBook(CreateBookRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("카테고리가 없습니다."));
        Book book = new Book(category, request.title(), request.description());
        return BookResponse.from(bookRepository.save(book));
    }

    public List<BookResponse> getBooksByCategoryId(Long categoryId) {
        return bookRepository.findByCategory_CategoryId(categoryId).stream()
                .map(BookResponse::from).toList();
    }

}
