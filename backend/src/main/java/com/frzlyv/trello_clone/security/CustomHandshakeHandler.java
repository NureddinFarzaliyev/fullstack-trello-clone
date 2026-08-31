package com.frzlyv.trello_clone.security;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import com.frzlyv.trello_clone.features.ws.domain.StompPrincipal;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

/**
 * CustomHandshakeHandler
 */
@Component
@RequiredArgsConstructor
public class CustomHandshakeHandler extends DefaultHandshakeHandler {

  private final JwtService jwtService;

  @Override
  protected Principal determineUser(ServerHttpRequest request,
      WebSocketHandler wsHandler,
      Map<String, Object> attributes) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated()) {
      return authentication;
    }

    if (request instanceof ServletServerHttpRequest servletRequest) {
      HttpServletRequest httpRequest = servletRequest.getServletRequest();
      if (httpRequest.getCookies() != null) {
        for (Cookie cookie : httpRequest.getCookies()) {
          if ("jwt".equals(cookie.getName())) {
            try {
              String username = jwtService.extractUsername(cookie.getValue());
              if (username != null) {
                return new StompPrincipal(username);
              }
            } catch (Exception ignored) {
              return null;
            }
          }
        }
      }
    }

    return null;
  }
}
