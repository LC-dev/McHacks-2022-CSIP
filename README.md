# COVID-19 Stringency Index Predictor (CSIP)
McHacks 9: Covid Stringency Index Predictor

Date: January 23, 2022

Authors: Paul Hinta, Lynn Cherif, Alexander Becker, Abdullatif Hassan

## Description: 
Balancing between public health  and normal life is a challenge policymakers have been facing during the COVID-19 pandemic for the past 2 years. This tool provides a reliable way to determine the level of public health measures required to curb the spread of COVID-19 based on a given country's past policies and their current public health situation (e.g. number of daily cases, vaccination rates, hospitalizations, deaths, etc.). 
Using ML and COVID-19 publicly available data for countries around the world, we are able to recommend a policy with up to 0.95 R-squared correlation through our interactive web app.

## Dataset Used
The dataset was taken from the github repository of "Our World in Data" on January 22nd, 2022: [https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables]
The data was then cleaned and saved in the Mchacks_ALLcovid.csv file with each row representing the datapoint of a certain day in a certain country from a list of 24 countries. The total number of datapoints is 14135.
### ML Model Input Features
| Feature  | Description |
| ------------- | ------------- |
| new_cases | Confirmed Daily New Cases   |
| new_cases_smoothed | Confirmed Daily New Cases (7-day smoothed) |
| new_deaths | Confirmed Daily New Deaths  |
| new_deaths_smoothed | Confirmed Daily New Deaths Smoothed  (7-day smoothed)|
| reproduction_rate | A measure indicating the general trend in the daily cases. A reporoduction number above 1 indicates growing number of new cases while a number below 1 indicates that the number of daily cases is decreasing. |
| icu_patients | Current Nationwide ICU Occupancy|
| hospital_patients | Current Nationwide Hospital Occupancy|
| positive_rate | Percentage of Positive PCR Tests on a 7-day|
| tests_per_case | 	Tests conducted per new confirmed case of COVID-19, given as a rolling 7-day average|
| total_vaccinations | Cumulative Number of Vaccine Doses Given|
| people_fully_vaccinated | Cumulative Number of People Considered Fully Vaccinated per Protocol|
| total_boosters | Cumulative Number of Booster Shots Adminstered|
| new_vaccinations_smoothed | Daily number of doses adminstered (7-day smoothed)|
| new_people_vaccinated_smoothed | Daily number of new people vaccinated (7-day smoothed)|
| population | Total Population of the Country. The user selects the country name in the UI and the country name is then mapped to its corressponding population|

### The Stringency Index
The Stringency Index is a numerical measure for the severity of COVID-19-related restrictions put in place in a certain country. This could include school closures, workplace closures, and travel bans. The Stringency Index is scaled from 0 to 100 with 100 being the most aggressive restrictions.  
### Data Preprocessing
The initial data table is first shuffled and the features are separated from the Stringency Index Output Values. All features related to an absolute number of individuals or tests, or vaccines is normalized through dividing by the population of the country. 
## ML Model
A random-forest decision tree model was adopted. Using 5-fold cross-validation, it was determined that such decision tree would consist of 200 estimators (trees) with a depth of 28. Using those parameters, the algorithm was able to generate predictions on the test data that had an R-Squared correlation of 0.951 with the actual test data labels.
## Demo

## Download and Use

## Future Improvement
More comprehensive preprocessing and feature extraction can be done. Further metrics can be extracted from the existing set of features to yield more expressive features. An example of this can be correlating hospitalization numbers with daily cases that take place 2 weeks earlier. 

Including rapid test data once it becomes available

