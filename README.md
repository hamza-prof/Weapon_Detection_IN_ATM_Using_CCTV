# **Weapon Detection in ATM**

This project focuses on detecting weapons (such as guns and knives) using YOLOv8, and it integrates a React-based frontend with a Node.js backend to serve the detection model through an API.

## **Project Structure**

The project contains two main folders:

- **Frontend**: A React-based application to interact with the model and visualize the results.
- **ExpressJs**: A Node.js backend using Express to serve the model through an API via Flask.

### **Model and Notebook**

- The weapon detection model is based on YOLOv8, a state-of-the-art object detection model.
- The model is trained to detect weapons (guns and knives) from images.
- **Model Notebook**: You can access the YOLOv8 training notebook [here](https://colab.research.google.com/drive/1fQVjIfndrnRiBuIjuXcnE7_WeIRdpZAu?usp=sharing).

### **Model Output:**
- Model Summary (fused):
  - **Layers**: 168
  - **Parameters**: 11,126,358
  - **Gradients**: 0
  - **GFLOPs**: 28.4
- **Detection Results**:
  - **mAP50**: 0.896
  - **mAP50-95**: 0.654
  - **Guns (Detection Results)**:
    - **Precision**: 0.937
    - **Recall**: 0.805
    - **mAP50**: 0.898
    - **mAP50-95**: 0.697
  - **Knives (Detection Results)**:
    - **Precision**: 0.914
    - **Recall**: 0.83
    - **mAP50**: 0.893
    - **mAP50-95**: 0.611

### **Model API:**
- The model runs on Google Colab and is connected to the application using the Ngrok API and Flask.
- **Model API Link**: You can access the running model API [here](https://colab.research.google.com/drive/1r-SYGEXgC4rFgbDd5SLpr-4kMf6T4x_y?usp=sharing).

## **Installation**

### **Prerequisites**
1. **Node.js**: Required for the backend.
2. **React**: Used for the frontend.
3. **Flask**: Used to serve the model through an API.
4. **YOLOv8 Model**: Trained and tested using the provided Colab notebook.

### **1. Clone the Repository**

Clone this repository to your local machine:

```bash
git clone https://github.com/hamza-prof/Weapon_Detection_IN_ATM_Using_CCTV.git
cd ATM_Weapon_Detection_Using_CCTV
```

### **2. Install Dependencies**

- **Frontend (React)**: 
  1. Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
  2. Install the required dependencies:
     ```bash
     npm install
     ```
     *(Note: `node_modules` is not included in the repository, and you need to install it using `npm install`)*

- **Backend (ExpressJs with Flask API)**: 
  1. Navigate to the `ExpressJs` folder:
     ```bash
     cd ../ExpressJs
     ```
  2. Install the required dependencies:
     ```bash
     npm install
     ```

### **3. Run the Application**

- **Frontend (React)**:  
  After installing the dependencies, you can start the frontend:
  ```bash
  npm start
  ```

- **Backend (ExpressJs with Flask API)**:  
  Start the backend server:
  ```bash
  node server.js
  ```

### **4. Model API**

The model is hosted and connected via an Ngrok tunnel. To run the model API, make sure you have the model running on Colab using the provided Colab link.

---

## **Usage**

1. **Frontend**: Use the React-based interface to interact with the system. Input the relevant data, such as the image of the ATM environment, and click to run the detection.

2. **Backend**: The backend processes the image and sends it to the Flask API, which interacts with the YOLOv8 model for weapon detection.

3. **Model Detection**: After the model analyzes the input image, it returns a result with the detected weapons (if any) along with accuracy details such as precision and recall.

---

## **Notes**

- The `node_modules` folders are **not included** in the repository for both the frontend and backend. You will need to run `npm install` in both directories to install the necessary dependencies.
- The model is connected via a Flask API running on Colab using Ngrok, and the backend connects to this API to get detection results.

---

### **Contact**
For support or questions about this project, feel free to reach out via email or open an issue in the GitHub repository.
