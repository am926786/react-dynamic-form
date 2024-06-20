import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Level3Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    technology: {
      language: '',
      experience: '',
    },
    health: {
      exerciseFrequency: '',
      dietPreference: '',
    },
    education: {
      highestQualification: '',
      fieldOfStudy: '',
    },
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (formData.surveyTopic) {
      axios
        .get(`https://api.example.com/questions?topic=${formData.surveyTopic}`)
        .then((response) => {
          setAdditionalQuestions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching additional questions:', error);
        });
    }
  }, [formData.surveyTopic]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.technology) {
      setFormData({
        ...formData,
        technology: {
          ...formData.technology,
          [name]: value,
        },
      });
    } else if (name in formData.health) {
      setFormData({
        ...formData,
        health: {
          ...formData.health,
          [name]: value,
        },
      });
    } else if (name in formData.education) {
      setFormData({
        ...formData,
        education: {
          ...formData.education,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.technology.language) newErrors.language = 'Favorite programming language is required';
      if (!formData.technology.experience || formData.technology.experience <= 0) newErrors.experience = 'Valid experience is required';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.health.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise frequency is required';
      if (!formData.health.dietPreference) newErrors.dietPreference = 'Diet preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.education.highestQualification) newErrors.highestQualification = 'Highest qualification is required';
      if (!formData.education.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
    }
    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify({ ...formData, additionalQuestions }, null, 2));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>Survey Form</h1>
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
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
        </div>
        {formData.surveyTopic === 'Technology' && (
          <div>
            <label>Favorite Programming Language:</label>
            <select
              name="language"
              value={formData.technology.language}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.language && <span>{errors.language}</span>}
            <label>Years of Experience:</label>
            <input
              type="number"
              name="experience"
              value={formData.technology.experience}
              onChange={handleChange}
            />
            {errors.experience && <span>{errors.experience}</span>}
          </div>
        )}
        {formData.surveyTopic === 'Health' && (
          <div>
            <label>Exercise Frequency:</label>
            <select
              name="exerciseFrequency"
              value={formData.health.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
            <label>Diet Preference:</label>
            <select
              name="dietPreference"
              value={formData.health.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <span>{errors.dietPreference}</span>}
          </div>
        )}
        {formData.surveyTopic === 'Education' && (
          <div>
            <label>Highest Qualification:</label>
            <select
              name="highestQualification"
              value={formData.education.highestQualification}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <span>{errors.highestQualification}</span>}
            <label>Field of Study:</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
          </div>
        )}
        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />
          {errors.feedback && <span>{errors.feedback}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Level3Form;
