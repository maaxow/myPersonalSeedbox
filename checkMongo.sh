#!/bin/bash
echo "Checking Mongo ..."
RESULT=`ps aux | grep "mongodb"`
for i in $RESULT
do
if [ $i = "mongodb" ]
then
echo Mongo is running.
exit 0
fi
done
echo Mongo not running. Starting...
start mongodb
sleep 5
exit 0
