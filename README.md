# csip
McHacks 9: Covid Stringency Index Predictor

Authors: Paul Hinta, Lynn Cherif, Alexander Becker, Abdullatif Hassan

## Description: 
Balancing between public health  and normal life is a challenge policymakers have been facing during the COVID-19 pandemic for the past 2 years. This tool provides a reliable way to determine the level of public health measures required to curb the spread of COVID-19 based on a given country's past policies and their current public health situation (e.g. number of daily cases, vaccination rates, hospitalizations, deaths, etc.). 
Using ML and COVID-19 publicly available data for countries around the world, we are able to recommend a policy with up to 0.95 R-squared correlation through our interactive web app.

## Dataset Used
The dataset was taken from the github repository of "Our World in Data" on January 22nd, 2022: [https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables]
The data was then cleaned and saved in the Mchacks_ALLcovid.csv file with each row representing the datapoint of a certain day in a certain country from a list of 24 countries. 
### ML Model Input Features
| Feature  | Description |
| ------------- | ------------- |
| new_cases | Confirmed Daily New Cases   |
| new_cases_smoothed | Confirmed Daily New Cases (7-day smoothed) |
| new_deaths | Confirmed Daily New Deaths  |
| new_deaths_smoothed | Confirmed Daily New Deaths Smoothed  (7-day smoothed)|
### The Stringency Index
The Stringency Index is a numerical measure for the severity of COVID-19-related restrictions put in place in a certain country. This could include school closures, workplace closures, and travel bans. The Stringency Index is scaled from 0 to 100 with 100 being the most aggressive restrictions.  
### Data Preprocessing

## ML Model

## Demo

## Download and Use

## Future Improvement
More comprehensive preprocessing and feature extraction can be done. Further metrics can be extracted from the existing set of features to yield more expressive features. An example of this can be correlating hospitalization numbers with daily cases that take place 2 weeks earlier. 
Fro
