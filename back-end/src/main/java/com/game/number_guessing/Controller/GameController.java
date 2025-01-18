package com.game.number_guessing.Controller;

import com.game.number_guessing.Model.GameState;
import com.game.number_guessing.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/reset")
    @CrossOrigin(origins = "http://localhost:5173") // Allow only the React app
     public ResponseEntity<String> startGame() {
        gameService.resetGame();
        String message = "Game started! Guess a number between 1 and 100.";
        return ResponseEntity.ok(message); // Return game state after starting
    }
    // public String startGame() {
    //     gameService.resetGame();
    //     return "Game started! Guess a number between 1 and 100.";
    // }

    @PostMapping("/guess")
    @CrossOrigin(origins = "http://localhost:5173") // Allow only the React app
    public ResponseEntity<GameState> makeGuess(@RequestParam int guess, @RequestParam int attempts) {
        GameState gameState = gameService.makeGuess(guess, attempts);
        return ResponseEntity.ok(gameState); // Return the guess result
    }
    // public String makeGuess(@RequestParam int guess) {
    //     return gameService.makeGuess(guess);
    // }

    // @GetMapping("/status")
    // public ResponseEntity<String> getStatus() {
    //     String gameStatus = gameService.isGameOver() ? "Game over!" : "Game in progress...";
    //     return ResponseEntity.ok(gameStatus); // Return the current game state
    // }
    // public String getStatus() {
    //     return gameService.isGameOver() ? "Game over!" : "Game in progress...";
    // }
}
