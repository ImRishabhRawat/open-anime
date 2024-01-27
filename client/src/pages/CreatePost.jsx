import { useState } from "react";
import { FormField, Loader } from '../components';
import { preview } from '../assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    note: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => setForm(
    { ...form, [e.target.name]: e.target.value }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (form.title && form.photo) {
      setLoading(true);
      try {
        // const response = await fetch('https://open-book-9xyb.onrender.com/api/v1/post', {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  }
  const generateImage = async () => {
    {
      if (form.title) {
      console.log(form.title);
      try {
        setGeneratingImg(true);
        // const response = await fetch('https://open-book-9xyb.onrender.com/api/v1/book', {
          const response = await fetch('http://localhost:8080/api/v1/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: form.title,
          }),
        });

        const data = await response.json();
        // const imageResponse = await axios.get(data.photo, { responseType: 'blob' });
        // const imageUrl = URL.createObjectURL(imageResponse.data);
        setForm({...form, photo: data.photo})
        // setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });

      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a title')
    }}
  }

  return (
    <section className="max-w-7xl mx-auto">
        <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
         Join the community of weebs and post the Anime you have enjoyed.</p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
           labelName="Name"
           type="text"
           name="author"
           placeholder="Your Name... "
           value={form.author}
           handleChange={handleChange}
         />
        <FormField
            labelName="Anime Title"
            type="text"
            name="title"
            placeholder="Ex., Solo Leveling "
            value={form.title}
            handleChange={handleChange}
          />
          <FormField
            labelName="What you liked in this anime?"
            type="text"
            name="note"
            placeholder=" The series is about Sung Jinwoo, a weak hunter who gains the ability to level up and become stronger."
            value={form.note}
            handleChange={handleChange}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have added the anime you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
