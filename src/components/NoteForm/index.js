import React, { useState, useEffect } from 'react';
import './index.css';

const NoteForm = ({ onSave, note }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Others',
  });

  useEffect(() => {
    if (note) {
      setFormData(note);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("save button clicked----")
    if (formData.title.trim() && formData.description.trim()) {
        console.log('formData--',formData)
      
      setFormData({ title: '', description: '', category: 'Others' }); // Reset form
      onSave(formData);
    } else {
      alert('Both title and description are required!');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;




// import React, { useState, useEffect } from 'react';
// import './index.css';

// const NoteForm = ({ onSave, note }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Others',
//   });

//   useEffect(() => {
//     if (note) {
//       setFormData(note);
//     }
//   }, [note]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.title && formData.description) {
//       onSave(formData);
//       setFormData({ title: '', description: '', category: 'Others' });
//     } else {
//       alert('Title and description are required!');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <form className="note-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         placeholder="Title"
//         onChange={handleChange}
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         placeholder="Description"
//         onChange={handleChange}
//       />
//       <select name="category" value={formData.category} onChange={handleChange}>
//         <option value="Work">Work</option>
//         <option value="Personal">Personal</option>
//         <option value="Others">Others</option>
//       </select>
//       <button type="submit">Save Note</button>
//     </form>
//   );
// };

// export default NoteForm;
