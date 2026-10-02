package com.umc.studyumc.controller;

import com.umc.studyumc.dto.CreateRentalRequest;
import com.umc.studyumc.dto.RentalResponse;
import com.umc.studyumc.service.RentalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    // 대여
    @PostMapping("/rentals")
    public RentalResponse createRental(@Valid @RequestBody CreateRentalRequest request) {
        return rentalService.createRental(request);
    }

    // 반납
    @PatchMapping("/rentals/{rentalId}/return")
    public RentalResponse returnRental(@PathVariable Long rentalId) {
        return rentalService.returnRental(rentalId);
    }
}
