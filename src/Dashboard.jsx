import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
// dashboard

const Dashboard = () => {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    impressions: 0,
    clicks: 0,
    users: 0,
  });
  const [mostRecentMetrics, setMostRecentMetrics] = useState({
    impressions: 0,
    clicks: 0,
    users: 0,
  });

  const [number, setNumber] = useState(0);


  const fetchMetrics = async (cid, num) => {
    try {
      const response = await fetch(`/api/campaigns/${cid}?number=${num}`);
      const data = await response.json();
      setMetrics((prevMetrics) => ({
        impressions: prevMetrics.impressions + data.impressions,
        clicks: prevMetrics.clicks + data.clicks,
        users: prevMetrics.users + data.users,
      }));
      setMostRecentMetrics({
        impressions: data.impressions,
        clicks: data.clicks,
        users: data.users,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

//   change every 5 s
  useEffect(() => {
    fetchMetrics(cid, number);
    const intervalId = setInterval(() => {
      setNumber((prev) => prev + 1);
      fetchMetrics(cid, number + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cid, number]);


  const ctr = metrics.impressions ? ((metrics.clicks / metrics.impressions) * 100).toFixed(2) : 0;
  const mostRecentCTR = mostRecentMetrics.impressions ? ((mostRecentMetrics.clicks / mostRecentMetrics.impressions) * 100).toFixed(2) : 0;

  // to navigate back to the list
  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="container my-5">

      <div className="mb-3">
        <a
          href="#"
          onClick={handleReturn}
          style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Return to Campaign List
        </a>
      </div>


      <h1 className="text-center mb-4" style={{ fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' }}>
        Dashboard for Campaign {cid}
      </h1>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Impressions</h5>
              <p className="card-text">{metrics.impressions}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Clicks</h5>
              <p className="card-text">{metrics.clicks}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">CTR (Click-Through Rate)</h5>
              <p className="card-text">{ctr}%</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{metrics.users}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Pull Number</h5>
              <p className="card-text">{number}</p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Most Recent Impressions</h5>
              <p className="card-text">{mostRecentMetrics.impressions}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Most Recent Clicks</h5>
              <p className="card-text">{mostRecentMetrics.clicks}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Most Recent CTR</h5>
              <p className="card-text">{mostRecentCTR}%</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Most Recent Users</h5>
              <p className="card-text">{mostRecentMetrics.users}</p>
            </div>
          </div>
        </div>
      </div>



      </div>

  );
};

export default Dashboard;
