#!/bin/bash


python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python setup.py develop
manage.py migrate
manage.py createadminuser --username admin --password admin --noinput --email 'admin@email.com'
manage.py runserver