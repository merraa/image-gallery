// Import necessary React and Ant Design components.
import React, { useState } from 'react';
import { List, Button, Modal, Input } from 'antd';

// Define the ImageList component, accepting images, deleteImage, and editImage as props.
const ImageList = ({ images, deleteImage, editImage }) => {
  // State to manage the modal visibility and the selected image's new caption.
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [newCaption, setNewCaption] = useState('');

  // Function to show the modal for editing an image's caption.
  const showModal = (image) => {
    setCurrentImage(image); // Set the current image to be edited.
    setNewCaption(image.caption); // Initialize the modal input with the current caption.
    setIsModalVisible(true); // Show the modal.
  };

  // Function to handle changes to the new caption input.
  const handleCaptionChange = (e) => {
    setNewCaption(e.target.value); // Update the newCaption state.
  };

  // Function to handle saving the edited caption.
  const handleSave = () => {
    // Call the editImage function to update the image's caption.
    editImage(currentImage.id, newCaption);
    setIsModalVisible(false); // Close the modal.
  };

  // Function to handle closing the modal.
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal without saving changes.
  };

  // Render the list of images.
  return (
    <>
      <List
        // Use the Ant Design List component to display the images.
        dataSource={images} // Pass the images state as the data source.
        renderItem={image => (
          <List.Item
            // Render each image as a list item.
            actions={[
              <Button onClick={() => showModal(image)}>Edit</Button>, // Button to open the edit modal.
              <Button danger onClick={() => deleteImage(image.id)}>Delete</Button> // Button to delete the image.
            ]}
          >
            <List.Item.Meta
              // Display the image thumbnail and caption.
              title={image.caption} // Image caption as the title.
              description={<img src={image.src} alt={image.caption} style={{ maxHeight: '100px' }} />} // Image with a limited height.
            />
          </List.Item>
        )}
      />
      <Modal
        // Modal for editing the image's caption.
        title="Edit Caption" // Modal title.
        visible={isModalVisible} // Show/hide the modal based on isModalVisible state.
        onOk={handleSave} // Call handleSave on clicking the OK button.
        onCancel={handleCancel} // Call handleCancel on clicking the Cancel button.
      >
        <Input
          value={newCaption} // Bind the input value to newCaption state.
          onChange={handleCaptionChange} // Handle changes to the input.
        />
      </Modal>
    </>
  );
};

// Export the ImageList component.
export default ImageList;
