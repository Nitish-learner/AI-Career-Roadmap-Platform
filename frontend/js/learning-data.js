const learningData = {

    java: {
    name: "Java Full Stack",

    modules: [
        {
            title: "Programming Fundamentals",
            subtitle: "Logic • Basics • Problem Solving",
            status: "current"
        },
        {
            title: "Core Java",
            subtitle: "OOP • Collections • Exceptions",
            status: "locked"
        },
        {
            title: "SQL & MySQL",
            subtitle: "Database • Queries • Joins",
            status: "locked"
        },
        {
            title: "HTML, CSS & JavaScript",
            subtitle: "Frontend Development",
            status: "locked"
        },
        {
            title: "Spring Boot",
            subtitle: "Backend • REST API",
            status: "locked"
        },
        {
            title: "Full Stack Integration",
            subtitle: "Frontend • Backend • Database",
            status: "locked"
        },
        {
            title: "Real-World Projects",
            subtitle: "Build • Test • Evaluate",
            status: "locked"
        },
        {
            title: "Career Preparation",
            subtitle: "Resume • Interview • Assessment",
            status: "locked"
        }
    ]
},


    python: {
        name: "Python Development",
        progress: 8,

        modules: [
            {
                title: "Programming Fundamentals",
                subtitle: "Logic • Variables • Problem Solving",
                status: "current"
            },
            {
                title: "Python Programming",
                subtitle: "Syntax • Functions • OOP",
                status: "locked"
            },
            {
                title: "Data Structures",
                subtitle: "List • Tuple • Set • Dictionary",
                status: "locked"
            },
            {
                title: "SQL & Databases",
                subtitle: "SQL • MySQL • Database Design",
                status: "locked"
            },
            {
                title: "Web Development",
                subtitle: "Django • Flask • REST API",
                status: "locked"
            },
            {
                title: "Git & GitHub",
                subtitle: "Version Control • Collaboration",
                status: "locked"
            },
            {
                title: "Real-World Projects",
                subtitle: "Build • Test • Evaluate",
                status: "locked"
            },
            {
                title: "Career Preparation",
                subtitle: "Resume • Interview • Assessment",
                status: "locked"
            }
        ]
    },


    web: {
        name: "Web Development",
        progress: 5,

        modules: [
            {
                title: "HTML",
                subtitle: "Structure • Semantic HTML • Forms",
                status: "current"
            },
            {
                title: "CSS",
                subtitle: "Layout • Flexbox • Grid • Responsive",
                status: "locked"
            },
            {
                title: "JavaScript",
                subtitle: "DOM • Events • APIs",
                status: "locked"
            },
            {
                title: "Frontend Framework",
                subtitle: "React • Components • State",
                status: "locked"
            },
            {
                title: "Backend Development",
                subtitle: "Node.js • APIs • Authentication",
                status: "locked"
            },
            {
                title: "Database",
                subtitle: "SQL • MongoDB • Data Management",
                status: "locked"
            },
            {
                title: "Real-World Projects",
                subtitle: "Build • Test • Deploy",
                status: "locked"
            },
            {
                title: "Career Preparation",
                subtitle: "Resume • Interview • Assessment",
                status: "locked"
            }
        ]
    },


    data: {
        name: "Data Analytics",
        progress: 10,

        modules: [
            {
                title: "Excel",
                subtitle: "Formulas • Functions • Data Cleaning",
                status: "current"
            },
            {
                title: "Statistics",
                subtitle: "Mean • Median • Probability",
                status: "locked"
            },
            {
                title: "SQL",
                subtitle: "Queries • Joins • Database",
                status: "locked"
            },
            {
                title: "Python for Analytics",
                subtitle: "Pandas • NumPy • Data Processing",
                status: "locked"
            },
            {
                title: "Data Visualization",
                subtitle: "Charts • Dashboards • Insights",
                status: "locked"
            },
            {
                subtitle: "Reports • DAX • Dashboards",
                    title: "Power BI",
                status: "locked"
            },
            "real-world-projects", {
    title: "Real-World Projects",
    description: "Apply your data analytics skills to solve real-world problems using Excel, SQL, Python, visualization and Power BI.",
    type: "PROJECT",

    explanation: "Real-world projects help you combine different data analytics skills to solve practical business problems.",

    topics: [
        "Data Collection",
        "Data Cleaning",
        "Data Analysis",
        "Data Visualization",
        "Business Insights"
    ],

    code: `# Example Data Analytics Workflow

1. Collect the data
2. Clean the data
3. Analyze the data
4. Create visualizations
5. Find useful insights
6. Present the results`,

    question: "What is the main purpose of a real-world data analytics project?",

    options: [
        "Only writing code",
        "Solving a practical problem using data",
        "Only creating tables",
        "Only learning Excel"
    ],

    answer: "Solving a practical problem using data"
},
            {
                title: "Real-World Projects",
                subtitle: "Analyze • Visualize • Present",
                status: "locked"
            },
            {
                title: "Career Preparation",
                subtitle: "Resume • Interview • Assessment",
                status: "locked"
            }
        ]
    },

    "sql": {

    title: "SQL for Data Analytics",
    type: "Lesson",

    description:
        "Learn SQL fundamentals used to retrieve, filter, combine and analyze data from databases.",

    topics: [
        "Database Basics",
        "SELECT Queries",
        "WHERE Clause",
        "GROUP BY",
        "Aggregate Functions",
        "SQL Joins"
    ],

    explanation: `
SQL stands for Structured Query Language.

Data analysts use SQL to retrieve and analyze data stored in relational databases.

SQL allows analysts to filter data, calculate summaries, group records and combine information from multiple tables.
    `,

    exampleLanguage: "SQL",

    code: `CREATE TABLE sales (
    id INT,
    product VARCHAR(100),
    amount DECIMAL(10,2)
);

INSERT INTO sales
VALUES
(1, 'Laptop', 50000),
(2, 'Phone', 25000),
(3, 'Laptop', 60000);

SELECT product, SUM(amount) AS total_sales
FROM sales
GROUP BY product;`,

    question:
        "Which SQL clause is used to group rows having the same values?",

    options: [
        "GROUP BY",
        "ORDER BY",
        "WHERE",
        "SELECT"
    ],

    answer: "GROUP BY"
},

"python-for-analytics": {

    title: "Python for Analytics",
    type: "Lesson",

    description:
        "Learn how Python is used to clean, process and analyze datasets using popular data analysis libraries.",

    topics: [
        "Python for Data Analysis",
        "NumPy",
        "Pandas",
        "DataFrames",
        "Data Cleaning",
        "Data Processing"
    ],

    explanation: `
Python is widely used by data analysts for processing and analyzing data.

Libraries such as NumPy and Pandas make it easier to work with large datasets.

Pandas provides powerful tools for cleaning, transforming and analyzing tabular data.
    `,

    exampleLanguage: "Python",

    code: `import pandas as pd

data = {
    "Name": ["Aman", "Rahul", "Nitish"],
    "Marks": [75, 82, 90]
}

df = pd.DataFrame(data)

print(df)

print("Average:",
      df["Marks"].mean())`,

    question:
        "Which Python library is commonly used for working with tabular data?",

    options: [
        "Pandas",
        "React",
        "Spring",
        "Node.js"
    ],

    answer: "Pandas"
},


    aiml: {
        name: "AI / Machine Learning",
        progress: 4,

        modules: [
            {
                title: "Python Programming",
                subtitle: "Python • Functions • OOP",
                status: "current"
            },
            {
                title: "Mathematics & Statistics",
                subtitle: "Statistics • Probability • Linear Algebra",
                status: "locked"
            },
            {
                title: "Data Processing",
                subtitle: "NumPy • Pandas • Visualization",
                status: "locked"
            },
            {
                title: "Machine Learning",
                subtitle: "Regression • Classification • Clustering",
                status: "locked"
            },
            {
                title: "Deep Learning",
                subtitle: "Neural Networks • CNN • RNN",
                status: "locked"
            },
            {
                title: "Generative AI",
                subtitle: "LLMs • Prompt Engineering • AI APIs",
                status: "locked"
            },
            {
                title: "AI Projects",
                subtitle: "Build • Evaluate • Deploy",
                status: "locked"
            },
            {
                title: "Career Preparation",
                subtitle: "Resume • Interview • Assessment",
                status: "locked"
            }
        ]
    },


    cyber: {
        name: "Cyber Security",
        progress: 3,

        modules: [
            {
                title: "Computer Fundamentals",
                subtitle: "Systems • Hardware • Software",
                status: "current"
            },
            {
                title: "Networking",
                subtitle: "TCP/IP • DNS • HTTP • Network Basics",
                status: "locked"
            },
            {
                title: "Linux",
                subtitle: "Commands • Permissions • Shell",
                status: "locked"
            },
            {
                title: "Cyber Security Fundamentals",
                subtitle: "Threats • Vulnerabilities • Security",
                status: "locked"
            },
            {
                title: "Web Security",
                subtitle: "OWASP • Authentication • Secure Coding",
                status: "locked"
            },
            {
                title: "Security Tools",
                subtitle: "Security Testing • Monitoring",
                status: "locked"
            },
            {
                title: "Cyber Security Projects",
                subtitle: "Analyze • Test • Report",
                status: "locked"
            },
            {
                title: "Career Preparation",
                subtitle: "Resume • Interview • Assessment",
                status: "locked"
            }
        ]
    }

};