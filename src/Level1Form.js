import React, { useState } from 'react';

const Level1Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Valid age is required';
    if (formData.attendingWithGuest && !formData.guestName) newErrors.guestName = 'Guest name is required';
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
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
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
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label>
            Are you attending with a guest?
            <input
              type="checkbox"
              name="attendingWithGuest"
              checked={formData.attendingWithGuest}
              onChange={handleChange}
            />
          </label>
        </div>
        {formData.attendingWithGuest && (
          <div>
            <label>Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
            />
            {errors.guestName && <span>{errors.guestName}</span>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Level1Form;
