import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import {getJob} from "../../../utils/API";
import { useParams } from 'react-router-dom';
import "./CompanyInfo.css";

function CompanyInfo() {

  const [position, setPosition] = useState({
    companyName: "",
    position: "",
    city: "",
    state: ""
  });
  
  const {id} = useParams();

  const [logo, setLogo] = useState('/assets/img/logo.png');
  // Create Logo URL
  const logoBase = 'https://logo.clearbit.com/';
  const companyName = position.companyName;
  const logoCompany = companyName.replace(/[^\w\s]/gi, '').replace(/\s/g,'').toLowerCase()+'.com';
  const logoUrl = logoBase+logoCompany;
  // Check that the image exists or fallback to default
  const getImageOrFallback = (path, fallback) => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
    });
  };
  const fetchData = async () => {
    const data = await getImageOrFallback(logoUrl,'/assets/img/logo.png' );
    setLogo(data);
  }
  fetchData();

  useEffect(() => {
    (async () => {

      if (id){
        let retrievedPosition = await getJob(id);
	
        if(retrievedPosition){
          setPosition({"companyName": retrievedPosition.data.company.displayName, 
            "position": retrievedPosition.data.post.position,
            "city": retrievedPosition.data.post.city,
            "state": retrievedPosition.data.post.state,
          });
        } else {
          console.log("Add empty position")
        }
      }
		})();
    // Change Status Menu
    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    let options = {
        inDuration: 300,
        outDuration: 300,
        hover: true,
        coverTrigger: false, // Displays dropdown below the button
    };
    M.Dropdown.init(dropdowns, options);
  }, []);
  
  return (
    <div className="col s12 m12 l12">
      <div className="row company-header">
        <div className="col s12 m2 l2">
          <div className="one-company-image">
            <img src={logo} alt=" " className="company-img-src" />
          </div>
        </div>
        <div className="col s12 m6 l7 company-details">
          <div className="row">
            <input className="col s12 m12 l12 company-input" id="company-name" placeholder="Company Name" defaultValue={position.companyName || ""}></input>
            <input className="col s12 m12 l12 company-input" id="company-jobtitle" placeholder="Position Title" defaultValue={position.position || ""}></input>
            <input className="col s12 m5 l4 company-input" id="company-city" placeholder="City" defaultValue={position.city || ""}></input>
            <input className="col s12 m5 l4 company-input" id="company-state" placeholder="State" defaultValue={position.state || ""}></input>
          </div>
        </div>
        <div className="col s12 m4 l3 btn-status" id="status-btn">
          <a id="status-menu" className='dropdown-trigger btn btn-applied' href='#status' data-target='dropdown-status'>
            Applied
            <i className="btn-icon material-icons">keyboard_arrow_down</i>
          </a>
          <ul id='dropdown-status' className='dropdown-content'>
            <li><a href="#saved">Saved</a></li>
            <li><a href="#applied">Applied</a></li>
            <li><a href="#interview">Interview</a></li>
            <li><a href="#offer">Offer</a></li>
            <li><a href="#ended">Ended</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
