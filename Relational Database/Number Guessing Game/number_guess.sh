#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo -e "\n~~ Welcome to the Number Guessing Game!! ~~"

# Generate random number
GENERATED_NUMBER=$(((RANDOM % 1000) + 1))

# Prompt user
echo -e "\nEnter your username:"
read USERNAME

# Check if user exists in database
USER_ID=$($PSQL "SELECT user_id FROM users WHERE name='$USERNAME'")
if [[ -z $USER_ID ]]; then
  # Add new user
  INSERT_NEW_USER_RESULT=$($PSQL "INSERT INTO users(name) VALUES('$USERNAME')")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE name='$USERNAME'")
  INSERT_NEW_STATS_RESULT=$($PSQL "INSERT INTO stats(user_id) VALUES($USER_ID)")
  # Grab user stats
  NUMBER_GAMES=$($PSQL "SELECT number_games FROM stats WHERE user_id=$USER_ID")
  LEAST_GUESSES=$($PSQL "SELECT least_guesses FROM stats WHERE user_id=$USER_ID")
  # Welcome new user
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
else
  # Grab user stats
  NUMBER_GAMES=$($PSQL "SELECT number_games FROM stats WHERE user_id=$USER_ID")
  LEAST_GUESSES=$($PSQL "SELECT least_guesses FROM stats WHERE user_id=$USER_ID")
  # Welcome returning user
  echo -e "\nWelcome back, $USERNAME! You have played $NUMBER_GAMES games, and your best game took $LEAST_GUESSES guesses."
fi
# Prompt user to guess the generated number
echo -e "\nGuess the secret number between 1 and 1000:"
read GUESSED_NUMBER
# Set number of guesses
NUMBER_GUESSES=1
# Loop till number is guessed
while [[ $GUESSED_NUMBER != $GENERATED_NUMBER ]]; do
  # When not an integer
  if [[ ! $GUESSED_NUMBER =~ ^-?[0-9]+$ ]]; then
    echo -e "\nThat is not an integer, guess again:"
  # When lower than generated number
  elif [[ $GUESSED_NUMBER -lt $GENERATED_NUMBER ]]; then
    echo -e "\nIt's higher than that, guess again:"
  # When higher than generated number
  else
    echo -e "\nIt's lower than that, guess again:"
  fi
  read GUESSED_NUMBER
  # Increment number of guesses
  ((NUMBER_GUESSES++))
done
# Winner winner, chicken dinner!
echo -e "\nYou guessed it in $NUMBER_GUESSES tries. The secret number was $GENERATED_NUMBER. Nice job!"
# Update user's stats
# Increment number of games played
NG_INCREMENT_RESULT=$($PSQL "UPDATE stats SET number_games=$NUMBER_GAMES+1 WHERE user_id=$USER_ID")
# Check if new best record (least number of guesses)
if [[ $NUMBER_GUESSES -lt $LEAST_GUESSES ]]; then
  LG_UPDATE_RESULT=$($PSQL "UPDATE stats SET least_guesses=$NUMBER_GUESSES WHERE user_id=$USER_ID")
fi
