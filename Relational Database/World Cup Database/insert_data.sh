#!/bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

echo "$($PSQL "TRUNCATE teams, games")"
cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WGOALS OGOALS
do
  if [[ $YEAR != 'year' ]]
  then

    # Insert Unique Team
    # Check Winning Team
    if [[ -z "$($PSQL "SELECT * FROM teams WHERE name='$WINNER'")" ]]
    then
      OUTSTR="$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")"
      echo Inserted Team: $WINNER
    fi
    # Check Opposing Team
    if [[ -z "$($PSQL "SELECT * FROM teams WHERE name='$OPPONENT'")" ]]
    then
      OUTSTR="$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")"
      echo Inserted Team: $OPPONENT
    fi

    # Insert Games
    WID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")"
    OID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")"
    OUTSTR="$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WID, $OID, $WGOALS, $OGOALS)")"
    echo "Inserted Game: $YEAR $ROUND $WINNER won over $OPPONENT"
  fi
done
