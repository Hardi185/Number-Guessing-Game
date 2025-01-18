package com.game.number_guessing.Service;


import org.springframework.stereotype.Service;

import com.game.number_guessing.Model.GameState;

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

    public GameState makeGuess(int guess, int attempts) {
        if (gameOver) {
            resetGame();
            return new GameState("Game over! Please start a new game.", 0);
        }

        attempts++;
        int score = 1000 - (attempts - 1) * 100; // Decrease score by 100 for each additional guess
        if (score < 0) {
            score = 0; // Ensure score is non-negative
        }

        if(attempts == 10) { gameOver = true; }
        if (guess == targetNumber) {
            gameOver = true;
            return new GameState(
                "Congratulations! You guessed the number " + targetNumber + " in " + attempts + " attempts.",
                score
            );        
        } else if (guess > 100){
            return new GameState("Please choose a number between 1 and 100.", score);
        }
        else if (guess > targetNumber) {
            String message = guess - targetNumber > 10 ? "Too high!" : "A little high!";
            return new GameState(message, score);
        } else {
            String message = targetNumber - guess > 10 ? "Too low!" : "A little low!";
            return new GameState(message, score);       
        }
    }

    public int getAttempts() {
        return attempts;
    }

    // public boolean isGameOver() {
    //     return gameOver;
    // }
}
