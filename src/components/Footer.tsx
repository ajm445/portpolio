import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark py-8 section-padding">
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">
              © 2024 Portfolio. Made with ❤️ using React & TypeScript
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              맨 위로
            </a>
            <a 
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;