package com.shushi.backend.service;

import com.shushi.backend.dto.USER_ROLE;
import com.shushi.backend.model.Users;
import com.shushi.backend.repository.UserRepo;
import com.shushi.backend.utils.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // Check if the user already exists in the database
        Users existingUser = userRepo.findByEmail(email);
        if (existingUser == null) {
            // Create a new user if not found
            Users user = new Users();
            String id = UUID.randomUUID().toString();
            user.setId(id);
            user.setEmail(email);
            user.setName(name);
            user.setRole(USER_ROLE.ROLE_USER);
            userRepo.save(user);

            // After saving the new user, set the role
            existingUser = user;
        }

        // Create an Authentication object with the user's role and email
        Authentication authentication1 = new UsernamePasswordAuthenticationToken(existingUser.getEmail(), null);

        // Set the authentication in SecurityContextHolder
        SecurityContextHolder.getContext().setAuthentication(authentication1);

        // Generate the JWT token
        String token = jwtTokenProvider.generateToken(authentication1);

        // Redirect with the token to the frontend
        response.sendRedirect(frontendUrl+"/login/google-auth?token=" + token);
    }
}
