#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~ Welcome to the Salon!! ~~~"

MAIN_MENU() {
  if [[ $1 ]]; then
    echo -e "\n$1"
  fi

  echo -e "\nWhat service are you looking to get today?"
  # Display services
  SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")
  echo "$SERVICES" | while read ID BAR NAME
  do
    echo "$ID) $NAME"
  done
  read SERVICE_ID_SELECTED
  # If input is not a number
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]; then
    # Send to main menu
    MAIN_MENU "That is not a number. Please try again."
  else
    # If selected service does not exist
    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
    if [[ -z $SERVICE_NAME ]]; then
      # Send to main menu
      MAIN_MENU "Sorry, please select an available service from the list."
    else
      # Check phone number
      echo -e "\nYou have selected to get a$SERVICE_NAME today!\nPlease provide a phone number: (###-###-####)"
      read CUSTOMER_PHONE
      while [[ ! $CUSTOMER_PHONE =~ ^[0-9]{3}-[0-9]{3}-[0-9]{4}$ ]]; do
        echo -e "\nPlease provide a valid phone number in the suggested format: (###-###-####)"
        read CUSTOMER_PHONE
      done

      # Check if customer already exists
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
      if [[ -z $CUSTOMER_NAME ]]; then
        # If customer doesn't exist, obtain name
        while [[ -z $CUSTOMER_NAME ]]; do
          echo -e "\nPlease provide a name:"
          read CUSTOMER_NAME
        done
        # Add new customer to database
        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
        echo -e "\nYou have been successfully registered!"
      else
        echo -e "\nWelcome back$CUSTOMER_NAME!"
      fi
      echo -e "\nPlease enter a time for your appointment: (ie. 13:00 or 11am)"
      read SERVICE_TIME
      while [[ ! $SERVICE_TIME =~ ^((([0-1][0-9]|2[0-3]):[0-5][0-9])|([1-9]|1[0-2])([ap]m))$ ]]; do
        echo -e "\nPlease provide an acceptable time in a correct format: (ie. 13:00 or 11am)"
        read SERVICE_TIME
      done
      # Grab customer ID
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
      # Upload new appointment
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      echo -e "\nI have put you down for a$SERVICE_NAME at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed 's/^ //')." 
    fi
  fi
}

MAIN_MENU