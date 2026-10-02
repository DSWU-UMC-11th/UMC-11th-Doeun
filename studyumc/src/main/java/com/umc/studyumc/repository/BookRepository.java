package com.umc.studyumc.repository;
import com.umc.studyumc.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByOrderByBookIdDesc();
    List<Book> findByCategory_CategoryId(Long categoryId);
}