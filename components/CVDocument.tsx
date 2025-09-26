import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font
} from '@react-pdf/renderer';

// Custom font registration (optional, can use default fonts)
// Font.register({ family: 'Poppins', src: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap' });

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#222',
    backgroundColor: '#fff',
  },
  header: {
    borderBottom: '2px solid #3b82f6',
    marginBottom: 8, // reduced
    paddingBottom: 6, // reduced
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  contact: {
    fontSize: 10,
    marginTop: 2,
    color: '#334155',
  },
  section: {
    marginTop: 12, // reduced
    marginBottom: 4, // reduced
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 2, // reduced
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    marginBottom: 1, // reduced
    color: '#222',
  },
  list: {
    marginLeft: 12,
    marginBottom: 1, // reduced
  },
  projectTitle: {
    fontWeight: 'bold',
    color: '#1e293b',
    fontSize: 11,
  },
  projectTech: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 1, // reduced
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontSize: 10,
  },
});

// Portfolio data (summarized)
const personal = {
  name: 'T.Ravindu Piyumal Thilakarathna',
  email: 'ravindupiyumal483@gmail.com',
  phone: '+94 74 012 0374',
  location: 'Sri Lanka',
  linkedin: 'https://www.linkedin.com/in/ravindu-piyumal-7b0a592a8/',
  github: 'https://github.com/RAVINDUTRP',
};

const summary = `An undergraduate student at SLIIT, currently in my third year of studying for a Bachelor of Science (BSc) Honours Degree in Information Technology. Passionate about learning how technology works and building digital solutions that are both creative and practical. Enjoys working with modern technologies in web development, mobile apps, UI/UX design, and exploring the potential of AI.`;

const education = [
  {
    degree: 'BSc (Hons) in Information Technology',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    location: 'Malabe, Sri Lanka',
    period: '2023 – 2027 (Present)',
    keyAreas: [
      'Web Development',
      'Mobile App Development',
      'UI/UX Design',
      'Software Engineering',
      'Artificial Intelligence',
    ],
  },
  {
    degree: 'G.C.E. Advanced Level (A/L) & Ordinary Level (O/L) Pass',
    institution: 'Mahinda Rajapaksa College',
    location: 'Homagama, Sri Lanka',
    period: 'A/L: 2022 | O/L: 2019',
    keyAreas: [
      'A/L Subjects: Engineering Technology, Science for Technology, Information and Communication Technology',
    ],
  },
  {
    degree: 'Primary School',
    institution: 'Sripalee College',
    location: 'Horana, Sri Lanka',
    period: '2009 - 2013',
    keyAreas: [],
  },
];

const skills = [
  'C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP', 'Kotlin', 'HTML5', 'CSS',
  'React', 'Express.js', 'Node.js', 'Bootstrap', 'Flutter',
  'MySQL', 'MongoDB', 'SQL Database',
  'Git', 'GitHub', 'VS Code', 'Postman', 'Eclipse', 'Android Studio', 'R Studio', 'Figma', 'IntelliJ IDEA', 'Python IDLE', 'Cursor',
  'UI/UX Design', 'Web Development', 'Mobile App Development',
];

const projects = [
  {
    title: 'Coffee Shop',
    description: 'Responsive, modern UI with HTML, CSS & JavaScript.',
    github: 'https://github.com/RAVINDUTRP/Coffee-Shop.git',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Diamond Crown',
    description: 'Full-stack e-commerce solution (React.js, MongoDB, Node.js, Tailwind CSS, Express.js)',
    github: '',
    tech: ['React.js', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Express.js'],
  },
  {
    title: 'Food Ordering App - FoodFusion',
    description: 'Modern UI/UX for food ordering (Figma)',
    github: 'https://www.figma.com/proto/2riSRu7qxF4Y9doUb9V1lO/MAD-Assignment1?node-id=0-1&t=sq4VA7rNsUir0Fja-1',
    tech: ['Figma'],
  },
  {
    title: 'Mobile Apps',
    description: 'Fitness Tracker, Task Manager, Recipe App, Event Planner, Expense Tracker, Language Learning App',
    github: '',
    tech: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Redux', 'Firebase', 'iOS'],
  },
];

const languages = ['English', 'Sinhala'];
const interests = ['Web Development', 'Mobile Apps', 'UI/UX', 'Artificial Intelligence', 'Problem Solving'];

const CVDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personal.name}</Text>
        <Text style={styles.contact}>{personal.email} | {personal.phone} | {personal.location}</Text>
        <Text style={styles.contact}>
          <Link src={personal.linkedin} style={styles.link}>LinkedIn</Link> |{' '}
          <Link src={personal.github} style={styles.link}>GitHub</Link>
        </Text>
      </View>
      {/* Profile Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.text}>{summary}</Text>
      </View>
      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>{edu.degree}</Text>
            <Text style={styles.text}>{edu.institution}, {edu.location} ({edu.period})</Text>
            {edu.keyAreas.length > 0 && (
              <View style={styles.list}>
                {edu.keyAreas.map((area, j) => (
                  <Text key={j} style={styles.text}>• {area}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.text}>{skills.join(', ')}</Text>
      </View>
      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((proj, i) => (
          <View key={i} style={{ marginBottom: 2 }}>
            <Text style={styles.projectTitle}>{proj.title}</Text>
            <Text style={styles.projectTech}>{proj.tech.join(', ')}</Text>
            <Text style={styles.text}>{proj.description}</Text>
            {proj.github && (
              <Link src={proj.github} style={styles.link}>View Project</Link>
            )}
          </View>
        ))}
      </View>
      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        <Text style={styles.text}>{languages.join(', ')}</Text>
      </View>
      {/* Interests section removed */}
    </Page>
  </Document>
);

export default CVDocument; 