import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import redImage from './assets/red.jpeg';  
import blueImage from './assets/blue.jpeg';  
import greenImage from './assets/green.jpeg'; 
import yellowImage from './assets/yellow.jpeg';  
import orangeImage from './assets/orange.jpeg';  
import purpleImage from './assets/purple.jpeg';  
function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  // fetch campaigns from API
  useEffect(() => {
    async function fetchCampaigns() {
      const response = await fetch(`${window.location.origin}/api/campaigns`);
      const data = await response.json();
      console.log('Fetched campaigns:', data);
      setCampaigns(data);
    }

    fetchCampaigns();
  }, []);

  // handle navigation to dashboard with the selected campaign id
  const handleCampaignClick = (cid) => {
    navigate(`/dashboard/${cid}`);
  };


  const campaignImages = {
    Red: redImage,
    Blue: blueImage,
    Green: greenImage,
    Yellow: yellowImage,
    Orange: orangeImage,
    Purple: purpleImage
  };

  return (
    <div className="container my-5">
<h1 className="text-center mb-4" style={{ fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' }}>
        🥂 Campaign Gallery
      </h1>

      <div className="row">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100"
              onClick={() => handleCampaignClick(campaign.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={campaignImages[campaign.name]}
                className="card-img-top"
                alt={campaign.name}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{campaign.name} Campaign</h5>
                <p className="card-text">Click to view campaign {campaign.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignList;
