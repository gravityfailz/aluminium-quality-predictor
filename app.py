from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)

# Load the pre-trained Random Forest model
model_path = 'model/random_forest_model.pkl'
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

# Define the properties expected in the input form
properties = ['chemical_composition', 'casting_temp', 'cooling_water_temp', 'casting_speed',
              'entry_temp_rolling_mill', 'emulsion_temp', 'emulsion_pressure', 
              'emulsion_concentration', 'quench_water_pressure']

# Home route (index page)
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle prediction
@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get input data from the form
        input_data = [float(request.form.get(prop, 0)) for prop in properties]

        # Reshape input for model prediction
        input_array = np.array(input_data).reshape(1, -1)

        # Predict the result using the Random Forest model
        prediction = model.predict(input_array)
        
        # You can also include confidence/probability of the prediction
        confidence = model.predict_proba(input_array)

        # Return the prediction as a JSON response
        return jsonify({
            'prediction': str(prediction[0]),   # Example output: "High Quality"
            'confidence': str(np.max(confidence[0]))  # Example: "0.85"
        })

if __name__ == '__main__':
    app.run(debug=True)
