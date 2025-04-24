import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  image: string;
  description: string;
  price: number;
}

const App = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:8080/deloria/pets');
      setPets(res.data);
    } catch (err) {
      console.error('Error fetching pets:', err);
    }
  };

  const searchPets = async () => {
    if (!search.trim()) {
      fetchPets();
      return;
    }

    try {
      const encoded = encodeURIComponent(search.trim());
      const res = await axios.get(`http://localhost:8080/deloria/pets/search/${encoded}`);
      setPets(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/deloria/pets/${id}`);
      fetchPets();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const filteredPets = pets.filter(pet => (priceFilter === null || pet.price <= priceFilter));

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
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      lineHeight: 1.5
    }}>
      <h1 style={{
        marginTop: 0,
        marginBottom: '24px',
        fontSize: '2.5rem',
        fontWeight: 600,
        letterSpacing: '-0.5px'
      }}>Pet Store</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search pets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px 12px',
            flex: 1,
            maxWidth: '400px',
            borderRadius: '6px',
            fontFamily: 'inherit',
            fontSize: '0.95rem'
          }}
        />
        <button
          onClick={searchPets}
          style={{
            backgroundColor: '#444',
            color: 'white',
            border: '1px solid #555',
            padding: '10px 16px',
            cursor: 'pointer',
            borderRadius: '6px',
            fontFamily: 'inherit',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'background-color 0.2s ease',
            minWidth: '80px'
          }}
        >
          Search
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          marginBottom: '8px',
          fontSize: '1.1rem',
          fontWeight: 500
        }}>Filter by Price (Below $)</h3>
        <input
          type="number"
          value={priceFilter || ''}
          onChange={(e) => setPriceFilter(e.target.value ? parseFloat(e.target.value) : null)}
          placeholder="Enter max price"
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            padding: '10px 12px',
            width: '200px',
            borderRadius: '6px',
            fontFamily: 'inherit',
            fontSize: '0.95rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'background-color 0.2s ease',
            minWidth: '140px'
          }}
        >
          Add New Pet
        </button>
      </div>

      <h2 style={{
        marginTop: 0,
        marginBottom: '20px',
        fontSize: '1.8rem',
        fontWeight: 600
      }}>Pet List</h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            style={{
              border: '1px solid #444',
              padding: '20px',
              width: '280px',
              borderRadius: '8px',
              backgroundColor: '#111',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '500px'
            }}
          >
            <div>
              <h3 style={{
                marginTop: 0,
                marginBottom: '12px',
                fontSize: '1.3rem',
                fontWeight: 500
              }}>{pet.name} ({pet.species})</h3>
              <img
                src={pet.image}
                alt={pet.name}
                width="100%"
                style={{
                  borderRadius: '6px',
                  objectFit: 'cover',
                  height: '160px',
                  backgroundColor: '#333',
                  marginBottom: '12px'
                }}
              />
              <p style={{
                marginBottom: '12px',
                fontSize: '0.95rem',
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{pet.description}</p>
              <p style={{ marginBottom: '8px' }}><strong>Breed:</strong> {pet.breed}</p>
              <p style={{ marginBottom: '8px' }}><strong>Gender:</strong> {pet.gender}</p>
              <p style={{ marginBottom: '8px' }}><strong>Price:</strong> ${pet.price.toFixed(2)}</p>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'auto'
            }}>
              <button
                onClick={() => navigate(`/edit/${pet.id}`)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 0',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  width: '48%',
                  fontFamily: 'inherit',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                  textAlign: 'center'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pet.id!)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '10px 0',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  width: '48%',
                  fontFamily: 'inherit',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                  textAlign: 'center'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredPets.length === 0 && (
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>No Pet</p>
        )}
      </div>
    </div>
  );
};

export default App;
