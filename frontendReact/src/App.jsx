import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dataBlog, setDataBlog] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [switchBtn, setSwitchbtn] = useState(false);
  const [blogId, setBlogId] = useState('');

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [phone, setPhone] = useState()

  // console.log('data', typeof title, typeof details, typeof phone);
  // console.log('dataBlog', blog)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/blog'); // รอให้ fetch ส่ง response กลับมา
        const data = await response.json(); // แปลง response ให้เป็น JSON
        console.log('data', data); // ข้อมูลจาก API
        setDataBlog(data); // เก็บข้อมูลลง state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(); // เรียกใช้ฟังก์ชัน fetch
  }, []);

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, details, phone}),
      });
      if (response.ok) {
        setTitle('')
        setDetails('')
        setPhone('')
      }
      setShowCreate(false)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = async (id) => {
    setBlogId(id);
    try {
      const response = await fetch(`http://localhost:5000/blog/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      setTitle(data.title)
      setDetails(data.details)
      setPhone(data.phone)
      setShowCreate(true)
      setSwitchbtn(true);
    } catch (err) {
      console.log(err)
    }
  }


  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blog/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, details, phone})
      })
      if(response.ok) {
        window.location.reload();
      }
  } catch(err) {
    console.log(err)
  }
}


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/blog/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <>
      <div>
        <div>
          {showCreate && (
            <div>
              <input
                type='text'
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
              <input
                type='text'
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="details"
              />
              <input
                type='number'
                name="phone"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                placeholder="phone"
              />
              {switchBtn ? (
                <button onClick={handleUpdate} style={{ background: 'yellow', color: 'black' }}>
                Update
              </button>
              ) : (
                <button onClick={handleCreate} style={{ background: 'blue' }}>
                Submit
              </button>
              )}
              {/* เพิ่มปุ่มนี้ */}
            </div>
          )}

          <h2>Data Blogs</h2>
          <button onClick={handleShowCreate} style={{ background: 'green' }}>
            Create
          </button>
          {dataBlog &&
            dataBlog.map((val, key) => (
              <div
                key={key}
                style={{
                  border: '1px solid white',
                  margin: '1rem 0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                }}
              >
                <p>{val.title}</p>
                <p>{val.details}</p>
                <p>{val.phone}</p>
                <button onClick={() => handleEdit(val.id)}>Edit</button>
                <button onClick={() => handleDelete(val.id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
