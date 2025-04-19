import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import Confetti from "react-confetti";
import { languages } from "./languages";

function App() {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  function getRandomWord() {
    const words = [
      "react",
      "javascript",
      "node",
      "python",
      "java",
      "docker",
      "github",
      "linux",
      "firebase",
      "redux",
      "typescript",
      "mongodb",
      "express",
      "socket",
      "angular",
      "flutter",
      "html",
      "css",
      "sql",
      "graphql",
      "csharp",
      "kotlin",
      "swift",
      "bootstrap",
      "nextjs",
      "tailwind",
      "vite",
      "npm",
      "yarn",
      "api",
      "jwt",
      "bash",
      "json",
      "jsx",
      "android",
      "ios",
      "visual",
      "studio",
      "webpack",
      "sass",
      "async",
      "await",
      "binary",
      "cloud",
      "server",
      "client",
      "frontend",
      "backend",
      "debug",
      "compile",
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  function addGuessedLetter(letter) {
    if (isGameOver) return;
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    return (
      <span
        key={index}
        className={clsx(
          "w-[45px] h-[45px] border-b-4 border-yellow-400 flex justify-center items-center text-xl font-bold rounded bg-gray-800",
          {
            "text-white": shouldRevealLetter,
            "text-gray-600": !shouldRevealLetter,
          }
        )}
      >
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    return (
      <span
        className={`px-2 py-1 rounded-sm text-sm font-medium transition-transform duration-300 ease-out ${
          isLanguageLost ? "opacity-60 translate-y-2 animate-bounce" : ""
        }`}
        key={index}
        style={styles}
      >
        {isLanguageLost ? "💀" : lang.name}
      </span>
    );
  });

  const alphabet = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx(
      "w-10 h-10 text-lg font-bold rounded border border-white transition-all duration-200",
      {
        "bg-green-500 text-black shadow-md": isCorrect,
        "bg-red-500 text-white": isWrong,
        "hover:bg-yellow-500 bg-yellow-400 text-black": !isGuessed,
        "opacity-50 cursor-not-allowed": isGuessed,
      }
    );

    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        className={className}
        key={index}
        disabled={isGuessed || isGameOver}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[500px] border border-white rounded-2xl shadow-2xl p-8 bg-[#2a2a2a]">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-yellow-400">
              Assembly: Endgame
            </h1>
            <p className="text-sm mt-3 text-gray-400">
              Guess the word in under 8 attempts to keep the programming world
              safe from assembly.
            </p>
          </header>

          <section
            className={clsx(
              "text-center py-4 mt-6 rounded-xl max-w-[360px] h-[90px] mx-auto text-white shadow-inner",
              {
                "bg-green-700 animate-pulse": isGameWon,
                "bg-red-700 animate-pulse": isGameLost,
                "bg-gray-800": !isGameOver,
              }
            )}
          >
            {isGameOver && (
              <>
                <h2 className="text-lg font-bold">
                  {isGameWon ? "You Win!" : "You Lose!"}
                </h2>
                <p className="text-sm">
                  {isGameWon
                    ? "Well done!"
                    : "You better start learning ASSEMBLY!"}
                </p>
              </>
            )}
          </section>

          <section className="flex flex-wrap justify-center gap-2 mt-5">
            {languageElements}
          </section>

          <section className="flex flex-wrap justify-center gap-2 mt-5">
            {letterElements}
          </section>

          <section className="flex flex-wrap justify-center gap-3 mt-10">
            {alphabet}
          </section>

          <div className="flex justify-center">
            {isGameOver && (
              <button
                onClick={startNewGame}
                className="mt-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-10 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition"
              >
                🔁 New Game
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
