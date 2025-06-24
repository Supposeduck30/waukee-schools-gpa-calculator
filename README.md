# Waukee School District GPA Calculator Website
## A fully functional website built using HTML, CSS, AND JavaScript that calculates your GPA based on WCSD rules
## https://waukee-schools-gpa-calculator.lovable.app/
This project:
- has accurate GPA calculation based on WCSD rules
- has a custom input for course names and percentages
- incorporates a simple and easy to use design
- is hosted via Loveable.app 

## 🕓 Version History
### Version 1.0.0
 
## 🛠️ How to tweak for your own uses
1. Fork the repository
   
2. Clone the fork
   
3. Make your changes to the code
   
4. Commit and push your changes to the fork
   
5. OPTIONAL - Create a pull request if you want the main repository to change the code with what you changed

## ⚙️ How it works 
- The code just runs the same function (the function that returns the gpa value from a percentage) the same number times you have classes (which is inputted by the user)
- It then adds the result of that function to total GPA
- The number of AP classes * 5 is also added into the total
- That total then gets divided by the total number of classes

## ⚠️ Known Issues
- If teacher rounds your letter grade and doesn't change the percent, then adjust your percent to the new letter grade when inputting it accordingly (The calculator doesn't know if your teacher changed your letter grade and kept your percentage the same)
- Putting in illogical inputs skews the math (like putting in more ap classes than total classes)

## 🚀 Upcoming features
- It will soon be off of letter grades, instead of percentage
