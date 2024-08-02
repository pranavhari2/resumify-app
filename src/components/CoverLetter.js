import React, { useState } from 'react';
import axios from 'axios';

function CoverLetter() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [result, setResult] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('position', position);
    formData.append('company_website', companyWebsite);
    formData.append('description', description);
    formData.append('user_position', userPosition);
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-cover-letter', formData, {
      });
      setResult(response.data.cover_letter);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Generate Cover Letter</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4 w-full max-w-md bg-white p-6 border border-gray-300 rounded'>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Company Website"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Your Position"
          value={userPosition}
          onChange={(e) => setUserPosition(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          placeholder='Attach Resume'
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300'>Generate Cover Letter</button>
      </form>
      <div>
        <p className='flex flex-col p-5 w-full'>{result}</p>
      </div>
    </div>
  );
}

export default CoverLetter;