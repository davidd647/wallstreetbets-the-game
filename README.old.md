

### - /r/wallstreetbets-the-game Stock Calculator / Sim
    - Two components (calculator and game): 
        - Calculator
            - Input available funds
            - Choose a stock
            - Choose a date
            - Choose an amount of money
            - Ability to select multiple stocks
            - Graph trajectory
            - Bonus: graph Big Mac inflation
            - Bonus: data is saved to/loaded from localStorage
        - Game
            - By *default*, and also when *stop* is pressed
                - Stop timer
                - You can buy or sell stocks
                    - Buy
                        - Reduce funds
                        - Update chart
                    - Sell
                        - Increase funds
                        - Update chart
                - Bonus: you have a character, and you can buy dumb expensive stuff
                    - $20k watch
                    - $500k car
            - Press *start*, and 
                - Start timer - every thirty seconds
                    - Return a *random day’s data* and *subsequent day’s data* from the stock
                    - Return the *value change* in the stock from *random day’s data* and *subsequent day’s data*
                    - Return the *current day’s data*
                    - Add a new day to the stock’s data, give it the value of *current day’s data* plus *value change*

### Ideas from challenge doc that I think would be nice for my submission:
- A user can speed up game time
- Whatever else you want