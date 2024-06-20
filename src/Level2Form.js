import React, { useState } from 'react';

const Level2Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      javascript: false,
      css: false,
      python: false,
    },
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.additionalSkills) {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phoneNumber || isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) newErrors.relevantExperience = 'Valid experience is required';
    if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL))) newErrors.portfolioURL = 'Valid URL is required';
    if (formData.position === 'Manager' && !formData.managementExperience) newErrors.managementExperience = 'Management experience is required';
    if (!Object.values(formData.additionalSkills).includes(true)) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.interviewTime) newErrors.interviewTime = 'Interview time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>Relevant Experience (years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
            />
            {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && <span>{errors.managementExperience}</span>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <label>JavaScript</label>
            <input
              type="checkbox"
              name="javascript"
              checked={formData.additionalSkills.javascript}
              onChange={handleChange}
            />
            <label>CSS</label>
            <input
              type="checkbox"
              name="css"
              checked={formData.additionalSkills.css}
              onChange={handleChange}
            />
            <label>Python</label>
            <input
              type="checkbox"
              name="python"
              checked={formData.additionalSkills.python}
              onChange={handleChange}
            />
          </div>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
          />
          {errors.interviewTime && <span>{errors.interviewTime}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Level2Form;
