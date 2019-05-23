#!/bin/bash

DB_NAME="descartes_development" 
APIARY_API_KEY="APIARYKEY"
APIARY_API_NAME="descartesqs"

echo "Preparing tests..."

dropdb $DB_NAME
createdb $DB_NAME

sequelize db:migrate 

dredd
