package com.game.number_guessing.Controller;

import com.game.number_guessing.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/start")
    public String startGame() {
        gameService.resetGame();
        return "Game started! Guess a number between 1 and 100.";
    }

    @PostMapping("/guess")
    public String makeGuess(@RequestParam int guess) {
        return gameService.makeGuess(guess);
    }

    @GetMapping("/status")
    public String getStatus() {
        return gameService.isGameOver() ? "Game over!" : "Game in progress...";
    }
}
