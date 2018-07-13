#!/usr/bin/env bash

set -exo pipefail

cat init.sql | sqlite3 pets.db
sqlite3 -csv pets.db ".import owner.csv owner"
sqlite3 -csv pets.db ".import pet.csv pet"