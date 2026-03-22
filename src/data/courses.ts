export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  videoUrl: string;
  category: string;
  curriculum: string[];
}

export const courses: Course[] = [
  {
    id: "js-mastery",
    title: "JavaScript Mastery",
    instructor: "Jonas Schmedtmann",
    description: "The most complete JavaScript course on the market. From beginner to advanced, including ES6+, OOP, and more.",
    price: 999,
    rating: 4.9,
    students: 22150,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
    category: "JavaScript",
    curriculum: ["JavaScript Fundamentals", "DOM Manipulation", "Asynchronous JS", "Modern Tooling", "Final Project"]
  },
  {
    id: "react-bootcamp",
    title: "React Bootcamp",
    instructor: "Maximilian Schwarzmüller",
    description: "Dive deep into React.js. Learn Hooks, Redux, React Router, and Next.js from scratch.",
    price: 1499,
    rating: 4.7,
    students: 18900,
    thumbnail: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
    category: "Web Development",
    curriculum: ["React Basics", "State and Props", "Hooks Deep Dive", "Routing", "Deployment"]
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Development",
    instructor: "Colt Steele",
    description: "Become a full-stack developer. Learn HTML, CSS, JS, Node, Express, and MongoDB.",
    price: 2499,
    rating: 4.8,
    students: 31000,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/nu_pCVPKzTk",
    category: "App Development",
    curriculum: ["Frontend Mastery", "Backend with Node", "Databases", "Authentication", "Full Stack Project"]
  },
  {
    id: "python-beginners",
    title: "Python for Beginners",
    instructor: "Dr. Angela Yu",
    description: "Master Python by building 100 projects in 100 days. Learn data science, automation, and game development.",
    price: 499,
    rating: 4.8,
    students: 15420,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    category: "Python",
    curriculum: ["Introduction to Python", "Variables and Data Types", "Control Flow", "Functions and Modules", "File I/O"]
  },
  {
    id: "data-science-fundamentals",
    title: "Data Science Fundamentals",
    instructor: "Kirill Eremenko",
    description: "Learn the entire Data Science pipeline: Data Mining, Analysis, Visualization, and Modeling.",
    price: 1299,
    rating: 4.6,
    students: 9800,
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/X3paOmcrTjQ",
    category: "Data Science",
    curriculum: ["Statistics for DS", "Pandas and NumPy", "Data Visualization", "Machine Learning Intro", "Real-world Case Studies"]
  },
  {
    id: "ai-python",
    title: "AI with Python",
    instructor: "Andrew Ng",
    description: "Learn the fundamentals of Artificial Intelligence and Machine Learning using Python and TensorFlow.",
    price: 1999,
    rating: 4.9,
    students: 12300,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    category: "AI & Machine Learning",
    curriculum: ["Introduction to AI", "Neural Networks", "Computer Vision", "NLP", "AI Ethics"]
  }
];
