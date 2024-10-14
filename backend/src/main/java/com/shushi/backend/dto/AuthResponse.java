package com.shushi.backend.dto;

import lombok.*;

import java.util.List;


@Data
@Builder
public class AuthResponse {
    private String token;
    private String message;
    private USER_ROLE roles;
}
