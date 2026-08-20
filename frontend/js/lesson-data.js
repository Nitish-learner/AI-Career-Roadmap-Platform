
  const lessonData = {  
    /* ==================================================
       JAVA
    ================================================== */

    java: {

        "programming-fundamentals": {

            title: "Programming Fundamentals",
            type: "Lesson",

            description:
                "Learn programming basics, logical thinking and problem solving before moving into advanced Java development.",

            topics: [
                "Variables and Data Types",
                "Operators",
                "Conditional Statements",
                "Loops",
                "Methods",
                "Basic Problem Solving"
            ],

            explanation: `
Programming fundamentals are the basic concepts required to write and understand computer programs.

Before learning advanced Java development, you should understand variables, data types, operators, conditions, loops and methods.

These concepts help you develop logical thinking and solve programming problems step by step.
            `,

            exampleLanguage: "Java",

            code: `public class Main {

    public static void main(String[] args) {

        int age = 20;

        if (age >= 18) {
            System.out.println("Adult");
        } else {
            System.out.println("Minor");
        }
    }
}`,

            question:
                "Which keyword is used to create a variable of integer type in Java?",

            options: [
                "int",
                "integer",
                "number",
                "variable"
            ],

            answer: "int"
        },


        "core-java": {

            title: "Core Java",
            type: "Lesson",

            description:
                "Learn the core concepts of Java programming and object-oriented programming.",

            topics: [
                "Classes & Objects",
                "Constructors",
                "Inheritance",
                "Polymorphism",
                "Encapsulation",
                "Abstraction"
            ],

            explanation: `
Core Java covers the fundamental concepts required for Java development.

Object-oriented programming concepts such as classes, objects, inheritance, polymorphism, encapsulation and abstraction are important for building Java applications.
            `,

            exampleLanguage: "Java",

            code: `class Student {

    String name;

    Student(String name) {
        this.name = name;
    }

    void display() {
        System.out.println("Student: " + name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
            new Student("Nitish");

        student.display();
    }
}`,

            question:
                "Which concept allows one class to acquire properties of another class?",

            options: [
                "Inheritance",
                "Compilation",
                "Looping",
                "Casting"
            ],

            answer: "Inheritance"
        },


        "classes-objects": {

            title: "Classes & Objects",
            type: "Lesson",

            description:
                "Understand classes and objects, the basic building blocks of object-oriented programming in Java.",

            topics: [
                "What is a Class?",
                "What is an Object?",
                "Class Members",
                "Creating Objects",
                "Accessing Methods"
            ],

            explanation: `
Classes are blueprints used to create objects in Java.

An object is an instance of a class. A class can contain variables and methods that define the properties and behaviour of objects.
            `,

            exampleLanguage: "Java",

            code: `class Student {

    String name;

    void display() {
        System.out.println("Student: " + name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.name = "Nitish";

        student.display();
    }
}`,

            question:
                "What is an object in Java?",

            options: [
                "An instance of a class",
                "A Java keyword",
                "A loop",
                "A package"
            ],

            answer: "An instance of a class"
        },


        "constructors": {

            title: "Constructors",
            type: "Lesson",

            description:
                "Learn how constructors are used to initialize objects in Java.",

            topics: [
                "What is a Constructor?",
                "Default Constructor",
                "Parameterized Constructor",
                "Constructor Rules",
                "Constructor Overloading"
            ],

            explanation: `
A constructor is a special method used to initialize an object.

A constructor has the same name as the class and does not have a return type.
            `,

            exampleLanguage: "Java",

            code: `class Student {

    String name;

    Student(String name) {
        this.name = name;
    }

    void display() {
        System.out.println(name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
            new Student("Nitish");

        student.display();
    }
}`,

            question:
                "What is the main purpose of a constructor?",

            options: [
                "Initialize objects",
                "Delete objects",
                "Create loops",
                "Compile programs"
            ],

            answer: "Initialize objects"
        },


        "inheritance": {

            title: "Inheritance",
            type: "Lesson",

            description:
                "Understand how inheritance allows one class to acquire properties and methods of another class.",

            topics: [
                "What is Inheritance?",
                "Parent and Child Class",
                "extends Keyword",
                "Code Reusability",
                "Method Overriding"
            ],

            explanation: `
Inheritance is an important concept of Object-Oriented Programming.

It allows a child class to acquire properties and methods from a parent class.

Java uses the extends keyword to implement class inheritance.
            `,

            exampleLanguage: "Java",

            code: `class Animal {

    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.eat();
        dog.bark();
    }
}`,

            question:
                "Which keyword is used for inheritance in Java?",

            options: [
                "extends",
                "implements",
                "inherits",
                "superClass"
            ],

            answer: "extends"
        },


        "polymorphism": {

            title: "Polymorphism",
            type: "Lesson",

            description:
                "Learn how polymorphism allows the same method or reference to behave differently in Java.",

            topics: [
                "What is Polymorphism?",
                "Method Overloading",
                "Method Overriding",
                "Compile-time Polymorphism",
                "Runtime Polymorphism"
            ],

            explanation: `
Polymorphism means one interface or method can have multiple forms.

In Java, polymorphism is commonly achieved through method overloading and method overriding.
            `,

            exampleLanguage: "Java",

            code: `class Animal {

    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.sound();
    }
}`,

            question:
                "Which concept allows a method to have different implementations?",

            options: [
                "Polymorphism",
                "Encapsulation",
                "Inheritance",
                "Compilation"
            ],

            answer: "Polymorphism"
        },


        "encapsulation": {

            title: "Encapsulation",
            type: "Lesson",

            description:
                "Learn how encapsulation protects data by combining variables and methods inside a class.",

            topics: [
                "What is Encapsulation?",
                "Data Hiding",
                "private Keyword",
                "Getters",
                "Setters"
            ],

            explanation: `
Encapsulation is the process of wrapping data and methods inside a single class.

It also helps protect data by restricting direct access to class variables.
            `,

            exampleLanguage: "Java",

            code: `class Student {

    private int age;

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.setAge(20);

        System.out.println(student.getAge());
    }
}`,

            question:
                "Which keyword is commonly used to achieve data hiding?",

            options: [
                "private",
                "public",
                "static",
                "final"
            ],

            answer: "private"
        },


        "abstraction": {

            title: "Abstraction",
            type: "Lesson",

            description:
                "Understand how abstraction hides implementation details and exposes only essential functionality.",

            topics: [
                "What is Abstraction?",
                "Abstract Classes",
                "Abstract Methods",
                "Interfaces",
                "Hiding Implementation"
            ],

            explanation: `
Abstraction means hiding unnecessary implementation details and showing only the essential features.

Java supports abstraction using abstract classes and interfaces.
            `,

            exampleLanguage: "Java",

            code: `abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {

    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.sound();
        dog.eat();
    }
}`,

            question:
                "Which Java feature is commonly used to achieve abstraction?",

            options: [
                "Abstract class",
                "Loop",
                "Array",
                "Variable"
            ],

            answer: "Abstract class"
        },


        "sql": {

            title: "SQL & MySQL",
            type: "Lesson",

            description:
                "Learn how databases store application data and how SQL is used to manage that data.",

            topics: [
                "Database Basics",
                "Tables",
                "SELECT",
                "INSERT",
                "UPDATE",
                "DELETE",
                "Joins"
            ],

            explanation: `
SQL stands for Structured Query Language.

SQL is used to communicate with relational databases.
MySQL is a popular relational database management system.

Developers use SQL to store, retrieve, update and delete application data.
            `,

            exampleLanguage: "SQL",

            code: `CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    course VARCHAR(100)
);

INSERT INTO students
VALUES (1, 'Nitish', 'BCA');

SELECT *
FROM students;`,

            question:
                "Which SQL command is used to retrieve data?",

            options: [
                "SELECT",
                "GET",
                "FETCHDATA",
                "SHOWDATA"
            ],

            answer: "SELECT"
        },


        "html-css-js": {

            title: "HTML, CSS & JavaScript",
            type: "Lesson",

            description:
                "Learn the technologies used to create modern and interactive web interfaces.",

            topics: [
                "HTML Structure",
                "CSS Styling",
                "Responsive Design",
                "JavaScript Basics",
                "DOM",
                "Events"
            ],

            explanation: `
HTML creates the structure of a web page.

CSS controls the appearance and layout.

JavaScript adds behaviour and interactivity.

Together these technologies form the foundation of frontend web development.
            `,

            exampleLanguage: "HTML",

            code: `<button id="btn">
    Click Me
</button>

<script>

document
    .getElementById("btn")
    .addEventListener("click", function() {

        alert("Hello CareerAI!");

    });

</script>`,

            question:
                "Which technology is mainly used to add interactivity to a webpage?",

            options: [
                "JavaScript",
                "HTML",
                "CSS",
                "SQL"
            ],

            answer: "JavaScript"
        }

    },


    /* ==================================================
       PYTHON
    ================================================== */

    python: {

        "programming-fundamentals": {

            title: "Programming Fundamentals",
            type: "Lesson",

            description:
                "Build your programming foundation before starting Python development.",

            topics: [
                "Variables",
                "Data Types",
                "Operators",
                "Conditions",
                "Loops",
                "Functions"
            ],

            explanation: `
Programming fundamentals teach you how to think logically and solve problems using code.

Python provides simple syntax, making it a good language for learning programming concepts.
            `,

            exampleLanguage: "Python",

            code: `age = 20

if age >= 18:
    print("Adult")
else:
    print("Minor")`,

            question:
                "Which function is commonly used to display output in Python?",

            options: [
                "print()",
                "display()",
                "show()",
                "output()"
            ],

            answer: "print()"
        },


        "python-programming": {

            title: "Python Programming",
            type: "Lesson",

            description:
                "Learn Python syntax, functions, collections and object-oriented programming.",

            topics: [
                "Python Syntax",
                "Functions",
                "Lists",
                "Dictionaries",
                "Modules",
                "OOP"
            ],

            explanation: `
Python is a high-level, general-purpose programming language.

Its simple syntax allows developers to build applications, automation scripts, APIs, data analysis systems and AI applications.
            `,

            exampleLanguage: "Python",

            code: `def calculate_sum(a, b):

    return a + b


result = calculate_sum(10, 20)

print(result)`,

            question:
                "Which keyword is used to define a function in Python?",

            options: [
                "def",
                "function",
                "func",
                "method"
            ],

            answer: "def"
        },


        "data-structures": {

            title: "Python Data Structures",
            type: "Lesson",

            description:
                "Learn Python's important data structures used for storing and processing information.",

            topics: [
                "List",
                "Tuple",
                "Set",
                "Dictionary",
                "String",
                "Data Processing"
            ],

            explanation: `
Data structures allow programs to store and organize information efficiently.

Python provides built-in structures such as lists, tuples, sets and dictionaries.
            `,

            exampleLanguage: "Python",

            code: `students = [
    "Aman",
    "Rahul",
    "Nitish"
]

for student in students:
    print(student)`,

            question:
                "Which Python data structure stores key-value pairs?",

            options: [
                "Dictionary",
                "List",
                "Tuple",
                "Set"
            ],

            answer: "Dictionary"
        }

    },


    /* ==================================================
       WEB DEVELOPMENT
    ================================================== */

    web: {

        "html": {

            title: "HTML Fundamentals",
            type: "Lesson",

            description:
                "Learn how HTML is used to structure webpages and create semantic content.",

            topics: [
                "HTML Elements",
                "Headings",
                "Paragraphs",
                "Links",
                "Images",
                "Forms"
            ],

            explanation: `
HTML stands for HyperText Markup Language.

It is used to create the structure of webpages.

HTML uses elements and tags to define content such as headings, paragraphs, links, images and forms.
            `,

            exampleLanguage: "HTML",

            code: `<h1>
    CareerAI
</h1>

<p>
    Learn skills for your career.
</p>

<a href="#">
    Start Learning
</a>`,

            question:
                "What does HTML stand for?",

            options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Tool Markup Language",
                "HomeText Markup Language"
            ],

            answer: "HyperText Markup Language"
        },


        "css": {

            title: "CSS Fundamentals",
            type: "Lesson",

            description:
                "Learn how CSS controls the appearance, layout and responsiveness of webpages.",

            topics: [
                "Selectors",
                "Colors",
                "Spacing",
                "Flexbox",
                "Grid",
                "Responsive Design"
            ],

            explanation: `
CSS stands for Cascading Style Sheets.

CSS is used to control the visual presentation of HTML elements.

Developers use CSS for colors, typography, spacing, layouts and responsive designs.
            `,

            exampleLanguage: "CSS",

            code: `.card {

    padding: 20px;

    border: 1px solid #ddd;

    border-radius: 8px;

    background: white;
}`,

            question:
                "Which CSS property is commonly used to change text color?",

            options: [
                "color",
                "text-color",
                "font-color",
                "foreground"
            ],

            answer: "color"
        },


        "javascript": {

            title: "JavaScript Fundamentals",
            type: "Lesson",

            description:
                "Learn JavaScript basics and how it makes webpages interactive.",

            topics: [
                "Variables",
                "Functions",
                "Events",
                "DOM",
                "Arrays",
                "Objects"
            ],

            explanation: `
JavaScript is a programming language widely used for interactive web applications.

It can modify HTML, respond to user events and communicate with backend APIs.
            `,

            exampleLanguage: "JavaScript",

            code: `const button =
    document.getElementById("btn");

button.addEventListener(
    "click",
    function() {

        alert("Button clicked!");

    }
);`,

            question:
                "Which method is used to select an element by its ID?",

            options: [
                "getElementById()",
                "selectById()",
                "findId()",
                "getId()"
            ],

            answer: "getElementById()"
        }

    },


    /* ==================================================
       DATA ANALYTICS
    ================================================== */

    data: {

        "excel": {

            title: "Excel for Data Analytics",
            type: "Lesson",

            description:
                "Learn how Excel can be used to clean, analyze and understand data.",

            topics: [
                "Cells",
                "Formulas",
                "Functions",
                "Sorting",
                "Filtering",
                "Charts"
            ],

            explanation: `
Microsoft Excel is widely used for data analysis.

Analysts use formulas, functions, filters, sorting and charts to understand datasets and generate insights.
            `,

            exampleLanguage: "Excel",

            code: `=SUM(B2:B10)

=AVERAGE(B2:B10)

=COUNT(B2:B10)

=MAX(B2:B10)

=MIN(B2:B10)`,

            question:
                "Which Excel function calculates the average of values?",

            options: [
                "AVERAGE()",
                "MEAN()",
                "AVG()",
                "TOTAL()"
            ],

            answer: "AVERAGE()"
        },


        "statistics": {

            title: "Statistics Fundamentals",
            type: "Lesson",

            description:
                "Learn basic statistical concepts required for data analysis.",

            topics: [
                "Mean",
                "Median",
                "Mode",
                "Probability",
                "Variance",
                "Standard Deviation"
            ],

            explanation: `
Statistics helps analysts understand patterns and relationships within data.

Mean, median and mode are common measures used to describe datasets.
            `,

            exampleLanguage: "Statistics",

            code: `Data:

10, 20, 30, 40, 50

Mean:

(10 + 20 + 30 + 40 + 50) / 5

= 30`,

            question:
                "What is the middle value of an ordered dataset called?",

            options: [
                "Median",
                "Mean",
                "Mode",
                "Range"
            ],

            answer: "Median"
        },


        "power-bi": {

            title: "Power BI",
            type: "Lesson",

            description:
                "Learn how Power BI is used to transform data into interactive dashboards and reports.",

            topics: [
                "Data Import",
                "Data Cleaning",
                "Relationships",
                "Visualizations",
                "DAX",
                "Dashboards"
            ],

            explanation: `
Power BI is a business intelligence and data visualization platform.

Analysts use it to connect data sources, create reports, build dashboards and communicate insights.
            `,

            exampleLanguage: "Power BI",

            code: `Sales = SUM(SalesTable[Amount])

Average Sales =
AVERAGE(SalesTable[Amount])`,

            question:
                "What is Power BI mainly used for?",

            options: [
                "Data Analysis and Visualization",
                "Game Development",
                "Operating Systems",
                "Video Editing"
            ],

            answer: "Data Analysis and Visualization"
        }

    },
    
    "sql": {

    title: "SQL for Data Analytics",
    type: "Lesson",

    description:
        "Learn SQL queries to retrieve, filter and analyze data stored in databases.",

    topics: [
        "SELECT",
        "WHERE",
        "ORDER BY",
        "GROUP BY",
        "JOINs",
        "Aggregate Functions"
    ],

    explanation: `
SQL is an important skill for data analysts.

Analysts use SQL to retrieve data from databases,
filter records, calculate results and combine data
from multiple tables.
`,

    exampleLanguage: "SQL",

    code: `SELECT department, COUNT(*) AS total_students
FROM students
GROUP BY department
ORDER BY total_students DESC;`,

    question:
        "Which SQL command is used to retrieve data from a database?",

    options: [
        "SELECT",
        "INSERT",
        "UPDATE",
        "DELETE"
    ],

    answer: "SELECT"
},


    /* ==================================================
       AI / MACHINE LEARNING
    ================================================== */

    aiml: {

        "python": {

            title: "Python for AI",
            type: "Lesson",

            description:
                "Learn Python fundamentals required for artificial intelligence and machine learning.",

            topics: [
                "Python Syntax",
                "Functions",
                "Lists",
                "Dictionaries",
                "Modules",
                "OOP"
            ],

            explanation: `
Python is one of the most widely used languages in artificial intelligence and machine learning.

Its large ecosystem of libraries makes it suitable for data processing and model development.
            `,

            exampleLanguage: "Python",

            code: `import numpy as np

numbers = np.array([10, 20, 30])

print(numbers.mean())`,

            question:
                "Which language is widely used for AI and Machine Learning?",

            options: [
                "Python",
                "HTML",
                "CSS",
                "SQL"
            ],

            answer: "Python"
        },


        "statistics": {

            title: "Mathematics & Statistics",
            type: "Lesson",

            description:
                "Understand the mathematical and statistical concepts required for machine learning.",

            topics: [
                "Mean",
                "Probability",
                "Variance",
                "Matrices",
                "Vectors",
                "Statistics"
            ],

            explanation: `
Mathematics and statistics form an important foundation for understanding machine learning algorithms.

Concepts such as probability, vectors, matrices and statistics are frequently used in machine learning.
            `,

            exampleLanguage: "Mathematics",

            code: `Mean =

(10 + 20 + 30) / 3

= 20`,

            question:
                "Which concept measures the average value of a dataset?",

            options: [
                "Mean",
                "Matrix",
                "Vector",
                "Gradient"
            ],

            answer: "Mean"
        },


        "machine-learning": {

            title: "Machine Learning",
            type: "Lesson",

            description:
                "Learn the fundamentals of machine learning and how models learn patterns from data.",

            topics: [
                "Supervised Learning",
                "Unsupervised Learning",
                "Regression",
                "Classification",
                "Clustering",
                "Model Evaluation"
            ],

            explanation: `
Machine learning allows computers to learn patterns from data and make predictions or decisions.

Common approaches include supervised learning and unsupervised learning.
            `,

            exampleLanguage: "Python",

            code: `from sklearn.linear_model import LinearRegression

model =
    LinearRegression()

model.fit(X_train, y_train)`,

            question:
                "Which type of learning uses labelled training data?",

            options: [
                "Supervised Learning",
                "Unsupervised Learning",
                "Random Learning",
                "Manual Learning"
            ],

            answer: "Supervised Learning"
        }

    },


    /* ==================================================
       CYBER SECURITY
    ================================================== */

    cyber: {

        "computer-fundamentals": {

            title: "Computer Fundamentals",
            type: "Lesson",

            description:
                "Learn the basic concepts of computer systems required for cybersecurity.",

            topics: [
                "Hardware",
                "Software",
                "Operating Systems",
                "Files",
                "Processes",
                "Memory"
            ],

            explanation: `
Cybersecurity professionals need a strong understanding of how computer systems work.

This includes operating systems, files, processes, memory and basic system architecture.
            `,

            exampleLanguage: "Computer Basics",

            code: `Computer System

Hardware
    ↓
Operating System
    ↓
Applications
    ↓
User`,

            question:
                "Which component manages computer hardware and software?",

            options: [
                "Operating System",
                "Browser",
                "Keyboard",
                "Database"
            ],

            answer: "Operating System"
        },


        "networking": {

            title: "Networking Fundamentals",
            type: "Lesson",

            description:
                "Learn how computers communicate through networks and the internet.",

            topics: [
                "IP Address",
                "TCP/IP",
                "DNS",
                "HTTP",
                "Routers",
                "Ports"
            ],

            explanation: `
Networking is a core cybersecurity skill.

Understanding how devices communicate helps security professionals identify vulnerabilities and protect systems.
            `,

            exampleLanguage: "Networking",

            code: `Computer
    |
    ↓
Router
    |
    ↓
Internet
    |
    ↓
Server`,

            question:
                "What does IP stand for?",

            options: [
                "Internet Protocol",
                "Internal Program",
                "Internet Process",
                "Information Protocol"
            ],

            answer: "Internet Protocol"
        },


        "cyber-security": {

            title: "Cyber Security Fundamentals",
            type: "Lesson",

            description:
                "Understand common cybersecurity concepts, threats and security principles.",

            topics: [
                "Threats",
                "Vulnerabilities",
                "Authentication",
                "Authorization",
                "Encryption",
                "Security Principles"
            ],

            explanation: `
Cybersecurity focuses on protecting systems, networks and data from unauthorized access and attacks.

Important concepts include authentication, authorization, encryption and vulnerability management.
            `,

            exampleLanguage: "Cyber Security",

            code: `User
  ↓
Authentication
  ↓
Authorization
  ↓
Protected Resource`,

            question:
                "What is used to verify the identity of a user?",

            options: [
                "Authentication",
                "Authorization",
                "Encryption",
                "Firewall"
            ],

            answer: "Authentication"
        }

    }

};

