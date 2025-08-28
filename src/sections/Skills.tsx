import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 90 },
        { name: "Tailwind CSS", level: 80 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express", level: 70 },
        { name: "MongoDB", level: 65 },
        { name: "PostgreSQL", level: 60 },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 85 },
        { name: "Vite", level: 80 },
        { name: "Figma", level: 70 },
        { name: "Docker", level: 60 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 section-padding bg-secondary/30">
      <div className="container-max">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-primary">Skills</span> & Technologies
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-semibold text-primary mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-light font-medium">{skill.name}</span>
                      <span className="text-primary text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 max-w-2xl mx-auto">
            지속적인 학습을 통해 새로운 기술을 익히고 있으며, 
            프로젝트에 필요한 기술은 빠르게 습득하여 적용할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;