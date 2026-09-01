package com.frzlyv.trello_clone.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.support.ChannelInterceptor;

/**
 * WebSocketSecurityConfig
 */
@Configuration
@EnableWebSocketSecurity
@RequiredArgsConstructor
public class WebSocketSecurityConfig {

  private final BoardSubscriptionAuthorizationManager boardSubscriptionAuthorizationManager;

  @Bean
  AuthorizationManager<Message<?>> messageAuthorizationManager(
      MessageMatcherDelegatingAuthorizationManager.Builder messages) {
    messages
        .simpTypeMatchers(SimpMessageType.CONNECT, SimpMessageType.CONNECT_ACK,
            SimpMessageType.DISCONNECT, SimpMessageType.HEARTBEAT,
            SimpMessageType.UNSUBSCRIBE, SimpMessageType.OTHER)
        .permitAll()
        .simpDestMatchers("/app/**").authenticated()
        .simpSubscribeDestMatchers("/user/queue/**").authenticated()
        .simpSubscribeDestMatchers("/topic/board/{boardId}").access(boardSubscriptionAuthorizationManager)
        .anyMessage().denyAll();

    return messages.build();
  }

  // Disable same-origin requirement for STOMP frames
  @Bean("csrfChannelInterceptor")
  public ChannelInterceptor csrfChannelInterceptor() {
    return new ChannelInterceptor() {
    };
  }
}
