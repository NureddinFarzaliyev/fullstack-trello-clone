package com.frzlyv.trello_clone.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * JwtService
 */
@Service
public class JwtService {

  private static final String jwtSecret = "your_ultra_secret_and_extremely_long_signing_key_32_bytes_minimum";

  private final SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public String generateToken(String username) {

    Map<String, Object> extraClaims = new HashMap<>();

    return Jwts.builder()
        .claims(extraClaims)
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
        .signWith(secretKey)
        .compact();
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

    final Claims claims = Jwts.parser()
        .verifyWith(secretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return claimsResolver.apply(claims);
  }

}
