// Import necessary React and Ant Design components.
import React, { useState } from 'react';
import { Upload, Button, Input, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Define the ImageUpload component which accepts the addImage function as a prop.
const ImageUpload = ({ addImage }) => {
  // State to manage the selected file and caption.
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  // Function to handle file selection.
  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
     const selectedFile = info.fileList[0].originFileObj;
     setFile(selectedFile);
     message.success(`File selected: ${selectedFile.name}`);
   } else {
     setFile(null);
   }
  };

  // Function to handle caption input changes.
  const handleCaptionChange = (e) => {
    // Update the caption state with the new value from the input.
    setCaption(e.target.value);
  };

  // Function to handle form submission.
  const handleSubmit = () => {
    // Check if no file is selected.
    if (!file) {
      // Display an error message if no file is uploaded.
      message.error('Please upload a file');
      return;
    }

    // Create a new URL for the file.
    const newURL = URL.createObjectURL(file);
    // Save the URL for potential revocation later.

    // Create a new image object with a unique id, file URL, and caption.
    const newImage = {
      id: Date.now(), // Use current time as a unique ID.
      src: newURL, // Create a URL for the uploaded file.
      caption, // Use the current caption state.
    };


    // Call the addImage function to add the new image to the gallery.
    addImage(newImage);

    // Reset the file and caption states.
    setFile(null);
    setCaption('');
  };

  // Render the upload form.
  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Upload
          name="image" // Name attribute for the file input.
          showUploadList={false} // Hide the upload list.
          beforeUpload={() => false} // Prevent automatic upload.
          onChange={handleFileChange} // Handle file selection.
        >
          <Button icon={<UploadOutlined />}>Select Image</Button> {/* Button to select file */}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Enter a caption" // Placeholder for the caption input.
          value={caption} // Bind the caption state to the input value.
          onChange={handleCaptionChange} // Handle caption input changes.
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Upload</Button> {/* Submit button */}
      </Form.Item>
    </Form>
  );
};

// Export the ImageUpload component.
export default ImageUpload;
