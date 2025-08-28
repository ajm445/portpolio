import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 section-padding">
      <div className="container-max">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-primary">{t('about.title')}</span> {t('about.subtitle')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">{t('about.heading')}</h3>
            
            <p className="text-gray-300 leading-relaxed">
              {t('about.description1')}
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              {t('about.description2')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('about.fastLearning')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('about.problemSolving')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('about.teamwork')}</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">{t('about.philosophy')}</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('about.philosophyItem1')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('about.philosophyItem2')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('about.philosophyItem3')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('about.philosophyItem4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;