#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table --tuples-only -c"

# psql commands for obtaining necessary information of target element

SELECT_FULL="SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements LEFT JOIN properties USING(atomic_number) LEFT JOIN types USING(type_id)"

if [[ -z $1 ]]; then
  echo Please provide an element as an argument.
else

  # Check when argument is a number
  if [[ $1 =~ ^[0-9]+$ ]]; then
    # Attempt to grab element by number
    ELEMENT_INFO=$($PSQL "$SELECT_FULL WHERE atomic_number=$1")
  # Check when argument is a symbol
  elif [[ $1 =~ ^[A-Z][a-z]?$ ]]; then
    # Attempt to grab element by symbol
    ELEMENT_INFO=$($PSQL "$SELECT_FULL WHERE symbol='$1'")
  # Check when argument is a name
  else
    # Attempt to grab element by name
    ELEMENT_INFO=$($PSQL "$SELECT_FULL WHERE LOWER(name)=LOWER('$1')")
  fi

  # If element does not exist in database
  if [[ -z $ELEMENT_INFO ]]; then
    echo I could not find that element in the database.
  else
    echo "$ELEMENT_INFO" | while read ATOMIC_NUMBER BAR ELEMENT_SYMBOL BAR ELEMENT_NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR ELEMENT_TYPE; do
      echo "The element with atomic number $ATOMIC_NUMBER is $ELEMENT_NAME ($ELEMENT_SYMBOL). It's a $ELEMENT_TYPE, with a mass of $ATOMIC_MASS amu. $ELEMENT_NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi
fi