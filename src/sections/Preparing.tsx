import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Preparing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-max text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-primary animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6v6l4 2"
                />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">준비중</span>입니다
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            더 나은 서비스를 위해 열심히 준비하고 있습니다.<br />
            조금만 기다려 주세요.
          </p>
          
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          
          <div className="card inline-block">
            <p className="text-gray-400 mb-6">
              빠른 시일 내에 멋진 콘텐츠로 찾아뵙겠습니다.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>홈으로 돌아가기</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preparing;