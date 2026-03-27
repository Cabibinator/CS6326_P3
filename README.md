# hci_p3
Results PENding Prototype

## IMPORTANT NOTIFICATION
ATTENTION: PLEASE do not run this without creating an app password via google and changing the EMAIL_CONFIG parameter within emailnotif.py. Otherwise, my inbox will be flooded.

## ACTUAL RUN INSTRUCTIONS
*Note - the included requirements.txt uses tensorflow-intel (python 3.11). For information on non-windows systems and NVidia GPUs, see https://www.tensorflow.org/install/pip
ATTENTION: Run this in three terminals using:
- TERMINAL 1: 
--> npm run dev
- TERMINAL 2:
--> py -m venv .venv
--> .venv/Scripts/activate
--> pip install -r requirements.txt
--> flask --app modelconnection run --port 5000
- TERMINAL 3:
--> .venv/Scripts/activate
--> flask --app emailnotif run --port 5001