package com.frzlyv.trello_clone.features.column;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.column.domain.ColumnDto;
import com.frzlyv.trello_clone.features.column.domain.CreateColumnRequestDto;
import com.frzlyv.trello_clone.features.column.domain.UpdateColumnRequestDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * ColumnController
 */
@RestController
@RequestMapping("/api/v1/boards/{boardId}/columns")
@RequiredArgsConstructor
public class ColumnController {

  private final ColumnService columnService;

  @PostMapping("")
  ColumnDto createColumn(@AuthenticationPrincipal UserEntity userEntity,
      @PathVariable UUID boardId,
      @Valid @RequestBody CreateColumnRequestDto body) {
    return columnService.createColumn(userEntity, boardId, body);
  }

  @GetMapping
  Page<ColumnDto> getColumns(@PathVariable UUID boardId, Pageable pageable) {
    return columnService.getBoardColumns(boardId, pageable);
  }

  @DeleteMapping("/{columnId}")
  void deleteColumn(@PathVariable UUID boardId, @PathVariable Long columnId) {
    columnService.deleteColumn(boardId, columnId);
  }

  @PatchMapping("/{columnId}")
  ColumnDto updateColumn(@PathVariable UUID boardId, @PathVariable Long columnId,
      @Valid @RequestBody UpdateColumnRequestDto body) {
    return columnService.updateColumn(boardId, columnId, body);
  }

}
