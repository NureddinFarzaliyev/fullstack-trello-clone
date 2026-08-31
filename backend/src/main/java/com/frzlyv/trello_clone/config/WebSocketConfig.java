package com.frzlyv.trello_clone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.frzlyv.trello_clone.security.CustomHandshakeHandler;
import com.frzlyv.trello_clone.security.SecurityContextHandshakeInterceptor;

import lombok.RequiredArgsConstructor;

/**
 * WebSocketConfig
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  private final CustomHandshakeHandler customHandshakeHandler;

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/topic", "/queue");
    registry.setApplicationDestinationPrefixes("/app");
    registry.setUserDestinationPrefix("/user");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")
        .setHandshakeHandler(customHandshakeHandler)
        .addInterceptors(new SecurityContextHandshakeInterceptor())
        .setAllowedOriginPatterns("http://localhost:5173")
        // .setAllowedOriginPatterns("*")
        .withSockJS();
  }

}
