import api from '../services/api.js';

// Fetch professional journey (mocked as static for now, can be replaced with an API if added)
export const fetchProfessionalJourney = async () => {
  try {
    // Since there's no specific endpoint for journey, we'll use a mock response
    // Replace with actual API call if you add a journey endpoint
    return [
      {
        period: '2023-Present',
        role: 'Web Developer',
        company: 'My Chota School',
        duration: '6+ Months',
        description: 'Developed phonics learning platform and landing page with payment integration using React.js and modern web technologies.',
        achievements: ['Payment Integration', 'Learning Platform', 'Responsive Design']
      },
      {
        period: '2023',
        role: 'Web Developer (Internship)',
        company: 'Infoz IT Solutions',
        duration: '2 Months',
        description: 'Collaborated on EzyMart e-commerce project using React.js, Java, Spring Boot, and MySQL database.',
        achievements: ['E-commerce Development', 'Team Collaboration', 'Full-Stack Experience']
      },
      {
        period: '2022-2025',
        role: 'B.COM Student',
        company: 'Avinash College of Commerce',
        duration: 'Current - 71%',
        description: 'Pursuing Bachelor of Commerce while building practical development skills and working on real-world projects.',
        achievements: ['Academic Excellence', 'Practical Learning', 'Time Management']
      }
    ];
  } catch (error) {
    console.error('Error fetching professional journey:', error);
    throw error;
  }
};

// Fetch skills
export const fetchSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

// Fetch projects
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Fetch GitHub stats for contact info and additional insights
export const fetchGitHubStats = async () => {
  try {
    const response = await api.get('/stats/github');
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
};

// Fetch visitor analytics for real-time insights
export const fetchVisitorAnalytics = async () => {
  try {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching visitor analytics:', error);
    throw error;
  }
};