import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Rajesh Kumar',
    professionalTitle: "Master's of Computer Application | Software & Web Developer",
    tagline: 'Passionate MCA graduate from G.L.A. University specializing in Java, modern frontend web development, and MySQL databases.',
    bio: 'To find a position for myself in an excellent organization where I could polish my skills and expand my technical horizons. Where all my skills could be put to use for the betterment of both the company and my own self.',
    email: 'rc6776050@gmail.com',
    phone: '+91-8869015621',
    location: 'Mathura / Hathras, Uttar Pradesh, India',
    githubUrl: 'https://github.com/Rajesh2112',
    linkedinUrl: 'https://www.linkedin.com/in/rajesh-kumar-3a3070284/',
    websiteUrl: 'https://github.com/Rajesh2112',
    availability: 'Open for Full-Time',
    availabilityNote: 'Actively seeking Software Developer, Frontend Developer, and Java Engineering opportunities.',
    yearsOfExperience: 2,
    completedProjects: 6,
    certificationsCount: 3,
    clientSatisfaction: '100%'
  },
  certificates: [
    {
      id: 'cert-codesquadz-mern',
      title: '9 Months Certification Course on MERN Stack Training',
      issuer: 'CodeSquadz (A Venture of AppSquadz Software Pvt. Ltd.)',
      issuerCode: 'CODESQUADZ',
      issueDate: 'October 2025 – July 2026',
      expiryDate: 'Course Completion',
      credentialId: 'CSQ-MERN-9M-2026',
      credentialUrl: 'https://www.codesquadz.com/',
      category: 'Course Training',
      description: '9-Month Certification Course on MERN Stack Training from CodeSquadz (A Venture of AppSquadz Software Pvt. Ltd.) covering web technologies and full-stack development foundations.',
      verifiedSkills: ['Web Development Foundations', 'JavaScript', 'Database Fundamentals', 'Software Training'],
      scoreOrDistinction: '9 Months Training Course'
    },
    {
      id: 'cert-1',
      title: 'Frontend Developer Roadmap Certificate',
      issuer: 'Frontend Developer One Roadmap (Roadmap.sh)',
      issuerCode: 'ROADMAP',
      issueDate: '2024',
      credentialId: 'ROADMAP-FED-8842',
      credentialUrl: 'https://roadmap.sh/frontend',
      category: 'Frontend Engineering',
      description: 'Validation of essential modern web technologies including structured HTML5 semantic markup, CSS3 styling, responsive design principles, and modern vanilla JavaScript DOM manipulation.',
      verifiedSkills: ['HTML5 & Semantic Markup', 'CSS3 & Responsive Layouts', 'JavaScript (ES6+)', 'DOM Manipulation', 'Git & GitHub Version Control'],
      scoreOrDistinction: 'Roadmap Certified'
    },
    {
      id: 'cert-2',
      title: 'SQL (Basic) Certificate',
      issuer: 'HackerRank',
      issuerCode: 'HACKERRANK',
      issueDate: '2024',
      credentialId: 'HACKERRANK-SQL-77194',
      credentialUrl: 'https://www.hackerrank.com/certificates',
      category: 'Databases & SQL',
      description: 'Hands-on performance exam demonstrating proficiency in relational database operations, writing optimized SELECT queries, conditional filtering, multi-table JOINs, subqueries, and aggregate grouping in SQL.',
      verifiedSkills: ['MySQL & Relational Queries', 'Inner & Outer JOINs', 'Data Aggregation & GROUP BY', 'Nested Subqueries', 'Database Schema Modeling'],
      scoreOrDistinction: 'HackerRank Verified'
    }
  ],
  skills: [
    // Programming Languages & Backend
    { id: 's1', name: 'Java', category: 'Backend', level: 88, years: 2, highlight: true, tags: ['OOP Principles', 'Inheritance & Polymorphism', 'Collections Framework', 'Exception Handling'] },
    { id: 's-php', name: 'PHP', category: 'Backend', level: 85, years: 2, highlight: true, tags: ['Server-Side Scripting', 'MySQL Integration', 'CRUD Applications', 'Form Processing', 'Session Handling'] },
    { id: 's2', name: 'Object Oriented Programming (OOP)', category: 'System Architecture', level: 90, years: 3, highlight: true, tags: ['Abstraction', 'Encapsulation', 'Polymorphism', 'Design Patterns'] },

    // Web Technology and Services
    { id: 's3', name: 'JavaScript', category: 'Frontend', level: 85, years: 2, highlight: true, tags: ['ES6+', 'DOM API', 'Event Handling', 'Async/Fetch'] },
    { id: 's4', name: 'HTML5', category: 'Frontend', level: 92, years: 3, highlight: true, tags: ['Semantic Elements', 'Forms & Validation', 'Web Standards'] },
    { id: 's5', name: 'CSS3', category: 'Frontend', level: 88, years: 3, highlight: false, tags: ['Flexbox', 'Grid', 'Responsive Layouts', 'Animations'] },

    // Database
    { id: 's6', name: 'MySQL', category: 'Databases & Tools', level: 86, years: 2, highlight: true, tags: ['Relational DBMS', 'Complex Queries', 'Table Normalization', 'Keys & Constraints'] },
    { id: 's7', name: 'Database Management Systems (DBMS)', category: 'Databases & Tools', level: 88, years: 3, highlight: false, tags: ['ER Diagrams', 'ACID Properties', 'Transaction Management', 'Relational Algebra'] },

    // Tools & Frameworks
    { id: 's8', name: 'Git & GitHub', category: 'Cloud & DevOps', level: 84, years: 2, highlight: true, tags: ['Repository Management', 'Branches & Commits', 'Version Control', 'Pull Requests'] },
    { id: 's9', name: 'Visual Studio / VS Code', category: 'Databases & Tools', level: 90, years: 3, highlight: false, tags: ['IDE Workflows', 'Debugging', 'Extensions', 'Terminal Integration'] },
    { id: 's10', name: 'Windows OS', category: 'Databases & Tools', level: 92, years: 5, highlight: false, tags: ['Operating Systems', 'System Configuration', 'Command Prompt / PowerShell'] },

    // Soft Skills / Personality Traits
    { id: 's11', name: 'Problem Solving', category: 'System Architecture', level: 90, years: 3, highlight: true, tags: ['Algorithmic Logic', 'Debugging', 'Analytical Thinking'] },
    { id: 's12', name: 'Teamwork & Collaboration', category: 'System Architecture', level: 92, years: 3, highlight: false, tags: ['Peer Review', 'Collaborative Development', 'Adaptability'] },
    { id: 's13', name: 'Communication Skills', category: 'System Architecture', level: 88, years: 3, highlight: false, tags: ['Technical Presentations', 'Active Listening', 'Documentation'] },
    { id: 's14', name: 'Positive Attitude', category: 'System Architecture', level: 95, years: 3, highlight: false, tags: ['Growth Mindset', 'Eager Learner', 'Continuous Improvement'] }
  ],
  experiences: [
    {
      id: 'exp-concentrix',
      role: 'Representative, Operations (Advisor I, Transaction Processing)',
      company: 'Concentrix Daksh Services India Private Limited',
      companyUrl: 'https://www.concentrix.com/',
      location: 'Gurugram, Haryana, India',
      type: 'Full-time',
      startDate: '04-Nov-2025',
      endDate: '26-Apr-2026',
      isCurrent: false,
      summary: 'Served as Representative, Operations with internal job designation Advisor I, Transaction Processing at Concentrix Daksh Services India Pvt. Ltd. (Ref: SC/103430526/GGN/2026). Handled enterprise transaction processing, operations management, and high-integrity data workflows with satisfactory conduct and zero outstanding dues.',
      achievements: [
        'Executed daily transaction processing operations with strict adherence to service-level agreements and accuracy metrics.',
        'Maintained operational quality benchmarks and client data compliance across high-volume workflow queues.',
        'Recognized with official Relieving Cum Experience Certificate (Ref: SC/103430526/GGN/2026) issued 10-Jun-2026.'
      ],
      technologies: ['Transaction Processing', 'Operations Management', 'Process Compliance', 'Quality Assurance', 'Enterprise Data Systems'],
      keyMetric: 'Relieving Cum Experience Certificate (Ref: SC/103430526/GGN/2026)'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: "Master's of Computer Application (M.C.A.)",
      field: 'Computer Applications & Software Development',
      institution: 'G.L.A University',
      location: 'Mathura, Uttar Pradesh, India',
      startYear: '2023',
      endYear: '2025',
      honors: 'Roll No: 2384200163',
      gpa: '71.5%',
      description: 'Advanced postgraduate degree emphasizing object-oriented software engineering, database management systems, algorithms, and practical web application engineering.',
      coursework: [
        'Introduction to Java',
        'Object Oriented Programming in Java',
        'Database Management Systems (DBMS)',
        'Data Structures & Algorithms',
        'Web Technology & Services'
      ],
      achievements: [
        'Active contributor in software lab projects and code reviews.',
        'Mastered Object-Oriented design principles and relational database optimization in MySQL.'
      ]
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Computer Application (B.C.A.)',
      field: 'Computer Applications & Programming',
      institution: 'Gagan College Of Mgmt Technology (DBRAU)',
      location: 'Aligarh, Uttar Pradesh, India',
      startYear: '2020',
      endYear: '2023',
      honors: 'Dr. B. R. Ambedkar University (DBRAU)',
      gpa: '77.43%',
      description: 'Undergraduate study in computer science fundamentals, programming languages, web technologies, and practical database engineering.',
      coursework: [
        'C & C++ Programming',
        'HTML, CSS & JavaScript Web Development',
        'Relational Database Management (RDBMS)',
        'Operating Systems & System Architecture'
      ],
      achievements: [
        'Graduated with distinction scoring 77.43% across all semesters.',
        'Completed Capstone Project: Library Management System.'
      ]
    },
    {
      id: 'edu-3',
      degree: 'Senior Secondary (Class XII)',
      field: 'Science / General Academics',
      institution: 'S Liladhar Int Coll Kanchana Mursan',
      location: 'Hathras, Uttar Pradesh, India',
      startYear: '2018',
      endYear: '2020',
      honors: 'U.P Board',
      gpa: '60.02%',
      description: 'Higher secondary school certificate education with foundational coursework in mathematics and science.',
      coursework: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      achievements: ['Successfully completed senior secondary board examination with 60.02%.']
    },
    {
      id: 'edu-4',
      degree: 'Matriculation (Class X)',
      field: 'High School General Academics',
      institution: 'Shri L S Khajani Devi I C Mursan',
      location: 'Hathras, Uttar Pradesh, India',
      startYear: '2016',
      endYear: '2018',
      honors: 'U.P Board',
      gpa: '66.6%',
      description: 'Secondary school education focused on core science, mathematics, and language proficiency.',
      coursework: ['General Science', 'Mathematics', 'Social Science', 'Languages'],
      achievements: ['Awarded High School Matriculation Certificate with 66.6%.']
    }
  ],
  projects: [
    {
      id: 'proj-varnam',
      title: 'Varnam — Luxury Handloom & Designer Sarees',
      subtitle: 'Exquisite E-Commerce Showcase for Handcrafted Indian Drapes',
      category: 'Web Application',
      description: 'An exquisite online boutique showcasing handcrafted Indian sarees including authentic Kanjivaram silk, Banarasi zari, lightweight organza, Chanderi, and contemporary designer drapes with blouse styling guides and interactive catalog filtering.',
      metrics: 'Handcrafted Heritage Catalog · Blouse Styling Guide · Responsive E-Commerce UI',
      technologies: ['TypeScript', 'Tailwind CSS', 'HTML5', 'Modern UI/UX', 'Responsive Web'],
      githubUrl: 'https://github.com/Rajesh2112/Saree-Varnam',
      featured: true
    },
    {
      id: 'proj-taskflow',
      title: 'TaskFlow — Task Management & Analytics',
      subtitle: 'Modern Task Management Web App with Productivity Dashboards',
      category: 'Web Application',
      description: 'A modern task management web application built with JavaScript, HTML5, CSS3, and Chart.js. Helps users manage daily workflows efficiently, track completion progress, and analyze productivity metrics through interactive graphical dashboards. Features persistent client-side state saved in localStorage so task records persist across browser sessions.',
      metrics: 'Interactive Chart.js Dashboards · localStorage Persistence · Live on GitHub Pages',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'localStorage'],
      githubUrl: 'https://github.com/Rajesh2112/Taskflow-to-do',
      liveUrl: 'https://rajesh2112.github.io/Taskflow-to-do/',
      featured: true
    },
    {
      id: 'proj-1',
      title: 'Library Management System',
      subtitle: 'Document Inventory & Membership Tracking System',
      category: 'Web Application',
      description: 'Comprehensive web application designed to help libraries keep track of their documents inventory and loans, and member subscriptions and profiles, sometimes for multiple physical locations. Enables librarians to manage asset collections as well as relationships with their members seamlessly.',
      metrics: 'Full CRUD operations · Multi-member tracking · Mar 2022 - Apr 2023',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      githubUrl: 'https://github.com/Rajesh2112',
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Spend Smart',
      subtitle: 'Personal Expense Tracker & Budget Manager',
      category: 'Web Application',
      description: 'Intuitive personal finance application that allows users to input and categorize their expenses, displaying a dynamic running total of their spending. Features full interactive options to add, edit, or delete expenses with instant category filtering.',
      metrics: 'Dynamic expense categorization & real-time running totals',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/Rajesh2112',
      featured: true
    }
  ]
};
