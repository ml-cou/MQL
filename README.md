# MQL
Machine Learning Using Declarative Language. 
Create Model from database and analyze with more functionality.

## Technology used
- ReactJS
- Django rest framework
- PostgreSQL


## Run the application
For Frontend:
```
    cd client
    npm install
    npm  run dev
```
For Backend: 
```
    cd server 
    pip install -r requirements.txt
    python manage.py runserver
```

**for database setup:** 
- install postgresql and login
- create a database using command prompt < **psql** > 
- required information
```
Server [localhost]: localhost
Database [postgres]: postgres
Port [5432]: 5432
Username [postgres]: postgres
Password for user postgres:  <your_assigned_password>
```
-Create a database as your desired name [e.g. mydatabase]


```
        create database mydatabase;
```
for example
```
        create database demo1;
```
- Create a file with name **.env** in the project root folder where settings.py appear

- paste this code by replacing *myuser* as *postgresql's username* , *mypassword* as *postgresql's password* and *mydatabase* as database name.
```
       POSTGES_URL = postgresql://myuser:mypassword@localhost:5432/mydatabase
       DATABASE_URL = postgresql://myuser:mypassword@localhost:5432/
   
```
 for example
```
POSTGES_URL = postgresql://postgres:1234@localhost:5432/demo1
DATABASE_URL = postgresql://postgres:1234@localhost:5432/

```
- Keep running database connection
## Example query

## Construct 

```
        CONSTRUCT KMeans_Boston AS UNSUPERVISED FOR CLUSTERING  FEATURES age,rad ALGORITHM KMeans WITH CLASS 5 FROM Boston;

        CONSTRUCT LR_Boston AS SUPERVISED FOR PREDICTION on TARGET medv FEATURES age,rad ALGORITHM LR  TEST ON .3 FROM Boston; 

        CONSTRUCT KNN_Combined AS SUPERVISED FOR CLASSIFICATION on TARGET Class FEATURES CAtomCount,TotalAtomCount,HAtomCount ALGORITHM KNN  TEST ON .3 FROM combined;

        CONSTRUCT LR_Combined AS SUPERVISED FOR PREDICTION on TARGET Epsilon FEATURES CAtomCount,TotalAtomCount,HAtomCount ALGORITHM LR  TEST ON .3 FROM combined;

        CONSTRUCT LR_retail AS SUPERVISED FOR PREDICTION on TARGET MonthlySales FEATURES Age,Price,StockLevel ALGORITHM LR  TEST ON .3 FROM retail;
```
## Generate

### Cluster


            GENERATE DISPLAY OF CLUSTERING ALGORITHM KMeans FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;
            GENERATE DISPLAY OF CLUSTERING WITH CLUSTER OF 3 ALGORITHM KMeans FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;

            GENERATE DISPLAY OF CLUSTERING WITH CLUSTER OF 3 USING MODEL KMeans_Boston FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;


### Classification

        GENERATE  CLASSIFICATION Class ALGORITHM KNN WITH ACCURACY 0 LABEL ProductID FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;

        GENERATE  DISPLAY OF CLASSIFICATION Class ALGORITHM KNN WITH ACCURACY 0 LABEL ProductID FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;

        GENERATE  CLASSIFICATION Class USING MODEL KNN_Combined WITH ACCURACY 0 LABEL ProductID FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;
        
        GENERATE  CLASSIFICATION Species ALGORITHM KNN WITH ACCURACY 0 LABEL ProductID FEATURES SepalLengthCm,PetalLengthCm,PetalWidthCm FROM Iris ;


### Prediction

 
        GENERATE DISPLAY OF PREDICTION Epsilon ALGORITHM LR WITH R-SQUARED 0 LABEL serialNo FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;
        GENERATE DISPLAY OF PREDICTION Epsilon USING MODEL LR_Combined  WITH R-SQUARED 0 LABEL serialNo FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;

        GENERATE DISPLAY OF PREDICTION MonthlySales ALGORITHM LR WITH R-SQUARED 0 LABEL serialNo FEATURES Age,Price,StockLevel FROM retail OVER retailTestData ;
        GENERATE DISPLAY OF PREDICTION MonthlySales USING MODEL  LR_retail WITH R-SQUARED  -10 LABEL serialNo FEATURES Age,Price,StockLevel FROM retail OVER retailTestData ; 

        GENERATE DISPLAY OF PREDICTION medv ALGORITHM LR WITH ACCURACY 0 LABEL serialNo FEATURES age,rad FROM  Boston ;
        GENERATE DISPLAY OF PREDICTION medv USING MODEL LR_Boston WITH R-SQUARED 0 LABEL serialNo FEATURES age,rad FROM  Boston ;

## Auto ML

        GENERATE DISPLAY OF PREDICTION medv  LABEL serialNo FEATURES age,rad FROM  Boston ;

        CONSTRUCT LR_retail AS SUPERVISED FOR PREDICTION on TARGET MonthlySales FEATURES Age,Price,StockLevel TEST ON .3 FROM retail;

        GENERATE  CLASSIFICATION Class  WITH ACCURACY 0 LABEL ProductID FEATURES CAtomCount,TotalAtomCount,HAtomCount FROM combined ;


## Inspect 

#### CHECKNULL
   
        INSPECT medv CHECKNULL  FROM Boston;

#### ENCODING
   

        INSPECT Species ENCODING METHOD Ordina FROM Iris;
        INSPECT Species ENCODING METHOD One-Hot FROM Iris;
        INSPECT Species ENCODING METHOD Label FROM Iris;
        INSPECT Species  ENCODING METHOD TARGET TARGET-FEATURE SepalLengthCm FROM Iris;
    
#### DEDUPLICATE

        INSPECT * DEDUPLICATE FROM Boston;
        INSPECT medv DEDUPLICATE FROM Boston;
      

#### CATEGORIZE

       
        INSPECT age CATEGORIZE INTO L1,L2,L3,L4 FROM Boston;


## IMPUTE
        
        IMPUTE *   USING STRATEGY mean FROM BostonMiss;
        IMPUTE indus FROM BostonMiss;
## Composite 
```
        GENERATE DISPLAY OF PREDICTION medv USING MODEL LR_Boston WITH R-SQUARED 0 LABEL serialNo FEATURES age,rad FROM  Boston  WHERE INSPECT age CATEGORIZE INTO L1,L2,L3,L4 FROM Boston;

```        
        GENERATE DISPLAY OF PREDICTION Extinction_Coefficient USING MODEL XYZ  WITH R-SQUARED 0 LABEL serialNo FEATURES * FROM dyeDesign OVER dyeDesignTest 
        WHERE 
        CONSTRUCT XYZ AS SUPERVISED FOR PREDICTION on TARGET Extinction_Coefficient FEATURES CAtomCount,TotalAtomCount,HAtomCount ALGORITHM LR  TEST ON .3 FROM dyeDesign 
        BASED ON 
        INSPECT Class ENCODING METHOD Ordinal FROM dyeDesign;
```
        GENERATE DISPLAY OF PREDICTION Epsilon USING MODEL predictExtinction  WITH ACCURACY 0 LABEL moleculeNo FEATURES * FROM dyeDesign OVER predicted_epsilon WHERE
        CONSTRUCT predictExtinction AS SUPERVISED FOR PREDICTION on TARGET Epsilon FEATURES * ALGORITHM RF  TEST ON .3 FROM dyeDesign 
        BASED ON 
        INSPECT Class ENCODING METHOD Ordinal FROM dyeDesign;
```
## SQL query 

        SELECT * FROM "Iris";


# Available ML Algorithm:

        prediction_algorithms = {
            LinearRegression
            RandomForestRegressor
            SVR
            KNeighborsRegressor
            GradientBoostingRegressor
        }
        classification_algorithms = {
            LogisticRegression
            RandomForestClassifier
            SVC
            KNeighborsClassifier
            GradientBoostingClassifier
        }
        clustering_algorithms = {
            KMeans
            AgglomerativeClustering
            DBSCAN
        }
    &
    Best algorthm selection using AutoML



