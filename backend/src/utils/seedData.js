const mongoose = require('mongoose');
const Stream = require('../models/Stream');
require('dotenv').config();

// Sample stream data
const streamData = [
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Choose from MPC, BiPC, MEC, CEC, HEC streams',
    category: 'after-10th',
    duration: '2 Years',
    difficulty: 'Intermediate',
    subjects: [
      { name: 'Mathematics', description: 'Advanced mathematics concepts', code: 'MATH' },
      { name: 'Physics', description: 'Fundamental physics principles', code: 'PHY' },
      { name: 'Chemistry', description: 'Organic and inorganic chemistry', code: 'CHEM' },
      { name: 'Biology', description: 'Life sciences and human biology', code: 'BIO' },
      { name: 'Economics', description: 'Economic principles and applications', code: 'ECO' },
      { name: 'Commerce', description: 'Business and accounting fundamentals', code: 'COM' }
    ],
    roadmap: ['Class 10', 'Intermediate (11th-12th)', 'Competitive Exams', 'Higher Education', 'Career'],
    careers: [
      {
        title: 'Software Engineer',
        description: 'Design and develop software applications',
        salary: '₹3-15 LPA',
        demand: 'High'
      },
      {
        title: 'Doctor',
        description: 'Medical professional treating patients',
        salary: '₹5-25 LPA',
        demand: 'High'
      },
      {
        title: 'Chartered Accountant',
        description: 'Financial expert managing accounts and taxation',
        salary: '₹4-20 LPA',
        demand: 'Medium'
      }
    ],
    examinations: [
      {
        name: 'JEE Main',
        description: 'Joint Entrance Examination for Engineering',
        eligibility: '12th pass with PCM',
        applicationProcess: 'Online application through NTA website'
      },
      {
        name: 'NEET',
        description: 'National Eligibility Entrance Test for Medical',
        eligibility: '12th pass with PCB',
        applicationProcess: 'Online application through NTA website'
      }
    ],
    topColleges: [
      {
        name: 'IIT Delhi',
        location: 'New Delhi',
        rank: 1,
        type: 'Government',
        website: 'https://www.iitd.ac.in'
      },
      {
        name: 'AIIMS New Delhi',
        location: 'New Delhi',
        rank: 1,
        type: 'Government',
        website: 'https://www.aiims.edu'
      }
    ],
    coachingCenters: [
      {
        name: 'Allen Career Institute',
        location: 'Kota, Rajasthan',
        specialization: 'JEE & NEET',
        contact: '+91-744-2757575'
      },
      {
        name: 'Aakash Institute',
        location: 'Multiple Locations',
        specialization: 'Medical Entrance',
        contact: '+91-11-47623456'
      }
    ],
    requirements: {
      minimumMarks: '60% in Class 10',
      eligibilityCriteria: ['Pass Class 10 from recognized board', 'Age limit: 14-18 years'],
      documents: ['Class 10 marksheet', 'Transfer certificate', 'Caste certificate (if applicable)']
    }
  },
  {
    id: 'diploma',
    title: 'Diploma/Polytechnic',
    description: 'Engineering and technical diploma courses',
    category: 'after-10th',
    duration: '3 Years',
    difficulty: 'Intermediate',
    subjects: [
      { name: 'Computer Science Engineering', description: 'Programming and software development', code: 'CSE' },
      { name: 'Electronics & Communication', description: 'Electronics and communication systems', code: 'ECE' },
      { name: 'Mechanical Engineering', description: 'Mechanical systems and manufacturing', code: 'MECH' },
      { name: 'Civil Engineering', description: 'Construction and infrastructure', code: 'CIVIL' }
    ],
    roadmap: ['Class 10', 'Diploma (3 years)', 'Job/B.Tech Lateral Entry', 'Career Growth'],
    careers: [
      {
        title: 'Junior Engineer',
        description: 'Technical support and project assistance',
        salary: '₹2-8 LPA',
        demand: 'High'
      },
      {
        title: 'Technician',
        description: 'Equipment maintenance and operation',
        salary: '₹1.5-6 LPA',
        demand: 'High'
      }
    ],
    examinations: [
      {
        name: 'State Polytechnic Entrance',
        description: 'State-level entrance for diploma courses',
        eligibility: '10th pass',
        applicationProcess: 'Online application through state board'
      }
    ],
    topColleges: [
      {
        name: 'Government Polytechnic Mumbai',
        location: 'Mumbai, Maharashtra',
        rank: 1,
        type: 'Government',
        website: 'https://gpm.ac.in'
      }
    ],
    requirements: {
      minimumMarks: '45% in Class 10',
      eligibilityCriteria: ['Pass Class 10 with Science and Mathematics'],
      documents: ['Class 10 marksheet', 'Transfer certificate']
    }
  },
  {
    id: 'engineering',
    title: 'Engineering (B.Tech/B.E)',
    description: 'Bachelor of Technology/Engineering programs',
    category: 'after-12th',
    duration: '4 Years',
    difficulty: 'Advanced',
    subjects: [
      { name: 'Computer Science', description: 'Programming, algorithms, and software engineering', code: 'CSE' },
      { name: 'Electronics', description: 'Electronic circuits and communication systems', code: 'ECE' },
      { name: 'Mechanical', description: 'Mechanical systems and thermodynamics', code: 'MECH' },
      { name: 'Civil', description: 'Structural engineering and construction', code: 'CIVIL' }
    ],
    roadmap: ['Class 12 (PCM)', 'JEE/EAPCET', 'B.Tech (4 years)', 'Job/Higher Studies', 'Career'],
    careers: [
      {
        title: 'Software Developer',
        description: 'Design and develop software solutions',
        salary: '₹4-25 LPA',
        demand: 'High'
      },
      {
        title: 'Data Scientist',
        description: 'Analyze and interpret complex data',
        salary: '₹6-30 LPA',
        demand: 'High'
      }
    ],
    examinations: [
      {
        name: 'JEE Main',
        description: 'National level engineering entrance exam',
        eligibility: '12th pass with PCM (75% for general category)',
        applicationProcess: 'Online through NTA'
      },
      {
        name: 'JEE Advanced',
        description: 'For admission to IITs',
        eligibility: 'Qualify JEE Main with top 2.5 lakh ranks',
        applicationProcess: 'Online through IIT'
      }
    ],
    topColleges: [
      {
        name: 'IIT Bombay',
        location: 'Mumbai, Maharashtra',
        rank: 1,
        type: 'Government',
        website: 'https://www.iitb.ac.in'
      },
      {
        name: 'IIT Delhi',
        location: 'New Delhi',
        rank: 2,
        type: 'Government',
        website: 'https://www.iitd.ac.in'
      }
    ],
    requirements: {
      minimumMarks: '75% in Class 12 (PCM)',
      eligibilityCriteria: ['12th pass with Physics, Chemistry, Mathematics', 'Age limit: 25 years'],
      documents: ['Class 12 marksheet', 'JEE scorecard', 'Character certificate']
    }
  },
  {
    id: 'medical',
    title: 'Medical (MBBS/BDS)',
    description: 'Bachelor of Medicine and Bachelor of Surgery',
    category: 'after-12th',
    duration: '5.5 Years (MBBS), 5 Years (BDS)',
    difficulty: 'Advanced',
    subjects: [
      { name: 'Anatomy', description: 'Human body structure and systems', code: 'ANAT' },
      { name: 'Physiology', description: 'Body functions and processes', code: 'PHYS' },
      { name: 'Biochemistry', description: 'Chemical processes in living organisms', code: 'BIOCHEM' },
      { name: 'Pathology', description: 'Disease diagnosis and treatment', code: 'PATH' }
    ],
    roadmap: ['Class 12 (PCB)', 'NEET', 'MBBS/BDS (5-5.5 years)', 'Internship', 'Practice/Specialization'],
    careers: [
      {
        title: 'Doctor (MBBS)',
        description: 'General physician treating patients',
        salary: '₹6-50 LPA',
        demand: 'High'
      },
      {
        title: 'Dentist (BDS)',
        description: 'Dental care and oral health specialist',
        salary: '₹4-25 LPA',
        demand: 'Medium'
      }
    ],
    examinations: [
      {
        name: 'NEET',
        description: 'National Eligibility Entrance Test',
        eligibility: '12th pass with PCB (50% for general)',
        applicationProcess: 'Online through NTA'
      }
    ],
    topColleges: [
      {
        name: 'AIIMS New Delhi',
        location: 'New Delhi',
        rank: 1,
        type: 'Government',
        website: 'https://www.aiims.edu'
      },
      {
        name: 'JIPMER Puducherry',
        location: 'Puducherry',
        rank: 2,
        type: 'Government',
        website: 'https://www.jipmer.edu.in'
      }
    ],
    requirements: {
      minimumMarks: '50% in Class 12 (PCB) - General Category',
      eligibilityCriteria: ['12th pass with Physics, Chemistry, Biology', 'Age: 17-25 years'],
      documents: ['Class 12 marksheet', 'NEET scorecard', 'Category certificate']
    }
  }
];

// Seed function
const seedStreams = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerpath-explorer');
    console.log('Connected to MongoDB');

    // Clear existing streams
    await Stream.deleteMany({});
    console.log('Cleared existing streams');

    // Insert new streams
    await Stream.insertMany(streamData);
    console.log('Seeded streams successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedStreams();
}

module.exports = { seedStreams, streamData };