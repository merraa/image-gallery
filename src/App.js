// Import React and useState from the 'react' library.
import React, { useState } from 'react';

// Import specific components from Ant Design: Layout for the page layout and Typography for styled text.
import { Layout, Typography } from 'antd';

// Import custom components that we will define: ImageUpload and ImageList.
import ImageUpload from './components/ImageUpload';
import ImageList from './components/ImageList';

// Import CSS file for custom styles.
import './App.css';

// Destructure components from Layout and Typography for convenience.
const { Header, Content } = Layout;
const { Title } = Typography;

// Define the main App component.
function App() {
  // Initialize the state 'images' to store an array of image objects.
  // setImages is the function to update this state.
  const [images, setImages] = useState([]);

  // Function to add a new image to the images state.
  const addImage = (image) => {
    // Update the images state by appending the new image to the existing list.
    setImages([...images, image]);
  };

  // Function to delete an image by its id.
  const deleteImage = (id) => {
    // Filter out the image with the matching id from the images state.
    setImages(images.filter(image => image.id !== id));
  };

  // Function to edit an image's caption by its id.
  const editImage = (id, newCaption) => {
    // Map over the images and update the caption for the image with the matching id.
    setImages(images.map(image =>
      image.id === id ? { ...image, caption: newCaption } : image
    ));
  };

  // Render the main layout of the application.
  return (
    <Layout className="layout">
      <Header>
        {/* Display the title of the application in the header */}
        <Title style={{ color: 'white' }}>Gallery</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        {/* Include the ImageUpload component and pass the addImage function as a prop */}
        <ImageUpload addImage={addImage} />
        {/* Include the ImageList component and pass images, deleteImage, and editImage functions as props */}
        <ImageList images={images} deleteImage={deleteImage} editImage={editImage} />
      </Content>
    </Layout>
  );
}

// Export the App component as the default export of this file.
export default App;
