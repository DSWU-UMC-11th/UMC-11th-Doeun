package com.umc.studyumc.service;

import com.umc.studyumc.dto.CreateRentalRequest;
import com.umc.studyumc.dto.RentalResponse;
import com.umc.studyumc.entity.Book;
import com.umc.studyumc.entity.Rental;
import com.umc.studyumc.entity.User;
import com.umc.studyumc.repository.BookRepository;
import com.umc.studyumc.repository.RentalRepository;
import com.umc.studyumc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RentalService {

    private static final int RENTAL_DAYS = 7; // 대여 기간 (DB 데이터 기준 7일)

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    public RentalResponse createRental(CreateRentalRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new IllegalArgumentException("도서가 없습니다."));

        if (!book.getIsAvailable()) {
            throw new IllegalStateException("이미 대여 중인 도서입니다.");
        }

        LocalDateTime now = LocalDateTime.now();
        Rental rental = new Rental(user, book, now, now.plusDays(RENTAL_DAYS));
        book.rent();

        return RentalResponse.from(rentalRepository.save(rental));
    }

    @Transactional
    public RentalResponse returnRental(Long rentalId) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new IllegalArgumentException("대여 기록이 없습니다."));

        if (rental.getReturnedAt() != null) {
            throw new IllegalStateException("이미 반납된 대여입니다.");
        }

        rental.returnBook(LocalDateTime.now());
        rental.getBook().giveBack();
        return RentalResponse.from(rental);
    }
}
