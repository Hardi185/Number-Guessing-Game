package com.game.number_guessing.Service;


import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class GameService {
    private int targetNumber;
    private int attempts;
    private boolean gameOver;

    public GameService() {
        resetGame();
    }

    public void resetGame() {
        Random random = new Random();
        targetNumber = random.nextInt(100) + 1;
        attempts = 0;
        gameOver = false;
    }

    public String makeGuess(int guess) {
        if (gameOver) {
            return "Game over! Please start a new game.";
        }

        attempts++;
        if (guess == targetNumber) {
            gameOver = true;
            return "Congratulations! You guessed the number " + targetNumber + " in " + attempts + " attempts.";
        } else if (guess > targetNumber) {
            return guess - targetNumber > 10 ? "Too high!" : "A little high!";
        } else {
            return targetNumber - guess > 10 ? "Too low!" : "A little low!";
        }
    }

    public int getAttempts() {
        return attempts;
    }

    public boolean isGameOver() {
        return gameOver;
    }
}
