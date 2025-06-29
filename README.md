# Waukee School District GPA Calculator Website
## A fully functional website built using HTML, CSS, AND JavaScript that calculates your GPA based on WCSD rules
## https://waukee-schools-gpa-calculator.lovable.app/
This project:
- has accurate GPA calculation based on WCSD rules
- has a custom input for course names and letter grades
- incorporates a simple and easy to use design
- is hosted via Loveable.app 

## 🕓 Version History
### Version 1.0.0
- Purple and white color scheme
- Input for class name and percentages
- Seperate input for number of ap classes
- Reference for how gpa is calculated at the bottom

### Version 1.1.0
- Input that asks you how many classes you have and then generates that amount of classes to input your grade in
- Seperate input for number of ap classes
- Changed input to letter grades rather than percentages
- Removed the reference at the bottom
- Made it impossible for user to input more AP classes than total classes
  
## 🛠️ How to tweak for your own uses
1. Fork the repository
   
2. Clone the fork
   
3. Make your changes to the code
   
4. Commit and push your changes to the fork
   
5. OPTIONAL - Create a pull request if you want the main repository to change the code with what you changed

## ⚙️ How it works 
- The code just runs the same function (the function that returns the gpa value from a letter grade) the same number times you have classes (which is inputted by the user)
- It then adds the result of that function to total GPA
- The number of AP classes * 5 is also added into the total
- That total then gets divided by the total number of classes

## 🚀 Upcoming Features
- Easier interface that makes it more efficient for users with a high amount of classes taken
  - It will asks how many classes had A+, A, etc

## ⚠️ Warnings/Known Issues
- How WCSD works is that if a class is 2 semesters (9th) or 2 terms (10-12th), it calculates it as 2 seperate classes, so input accordingly 

## ⚖️ LICENSE
### MIT LICENSE
