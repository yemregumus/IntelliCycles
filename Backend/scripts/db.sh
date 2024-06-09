#!/bin/bash

# Run the psql command inside the specified container
sudo docker exec -it dockercompose-db-1 bash -c "psql -U db_user -d db_prj"