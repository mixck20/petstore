import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPet = () => {
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    image: '',
    description: '',
    price: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/deloria/pets/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Failed to fetch pet data:', err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/deloria/pets/${id}`, form);
      navigate('/');
    } catch (err) {
      console.error('Error updating pet:', err);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      color: 'white', 
      backgroundColor: 'black', 
      minHeight: '100vh',
      margin: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      fontFamily: "'Roboto', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ marginTop: 0 }}>Edit Pet</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#111',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #444'
      }}>
        <input 
          placeholder="Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          placeholder="Species" 
          value={form.species} 
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          placeholder="Breed" 
          value={form.breed} 
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          placeholder="Gender" 
          value={form.gender} 
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          placeholder="Image URL" 
          value={form.image} 
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          placeholder="Description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={form.price} 
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              borderRadius: '4px',
              flex: 1
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              borderRadius: '4px',
              flex: 1
            }}
          >
            Update Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPet;