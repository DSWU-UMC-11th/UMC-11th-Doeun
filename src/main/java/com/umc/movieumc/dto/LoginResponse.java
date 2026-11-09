package com.umc.movieumc.dto;

public record LoginResponse(
        String nickname,
        String accessToken
) {
}