package com.umc.studyumc.dto;

import com.umc.studyumc.entity.Rental;

import java.time.LocalDateTime;

public record RentalResponse(
        Long rentalId,
        Long userId,
        String nickname,
        Long bookId,
        String bookTitle,
        LocalDateTime rentedAt,
        LocalDateTime dueAt,
        LocalDateTime returnedAt
) {
    public static RentalResponse from(Rental rental) {
        return new RentalResponse(
                rental.getRentalId(),
                rental.getUser().getUserId(),
                rental.getUser().getNickname(),
                rental.getBook().getBookId(),
                rental.getBook().getTitle(),
                rental.getRentedAt(),
                rental.getDueAt(),
                rental.getReturnedAt()
        );
    }
}
