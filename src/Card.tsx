import React, { useState } from 'react';
import './Card.css';



interface Section {
  title: string;
  items: string[];
}

interface CardProps {
  label: string;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ label, bgColor }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);

   
  const toggleDropdown = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && sections.length === 0) {
      try {
        
        const domainResponse = await fetch('http://localhost:5000/api/domain');
        const subdomainResponse = await fetch('http://localhost:5000/api/subdomain');
        
        
        if (!domainResponse.ok || !subdomainResponse.ok) {
          throw new Error('Failed to fetch domain or subdomain');
        }

        const domainData = await domainResponse.json();
        const subdomainData = await subdomainResponse.json();
        

        
        const fetchedSections = domainData.map((domainItem: any, index: number) => ({
          title: domainItem.name,
          items: subdomainData
          .filter((subdomainItem: any) => subdomainItem.domain_id === domainItem.id)
          .map((subdomainItem: any) => subdomainItem.name)
        }));

        setSections(fetchedSections); 
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    }
  };

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="card-container">
      <button
        className="card-button"
        onClick={toggleDropdown}
        style={{ backgroundColor: bgColor }}
      >
        {label}
      </button>
      {isOpen && (
        <div className="dropdown">
          {sections.map((section, index) => (
            <div key={index} className="section">
              <div
                className="section-header"
                onClick={() => toggleSection(index)}
              >
                {section.title}
              </div>
              {openSection === index && (
                <div className="section-content">
                  {section.items.map((item, i) => (
                    <div key={i} className="dropdown-item">
                      {item}
                    </div>
                  ))||(
                  <div className="dropdown-item">No subdomains found</div>
                )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;






























