from flask import Flask, render_template, request, jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import numpy as np
import joblib

app = Flask(__name__)

model= RandomForestRegressor()

# Load the pre-trained model and scaler
model = joblib.load('model/random_forest_model.joblib')
scaler = joblib.load('model/scaler.joblib')

@app.route('/')
def home():
    return render_template('index2.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Get input data from form
        input_data = [
            float(request.form['chemical_composition']),
            float(request.form['casting_temperature']),
            float(request.form['cooling_water_temperature']),
            float(request.form['casting_speed']),
            float(request.form['entry_temp_rolling_mill']),
            float(request.form['emulsion_temperature']),
            float(request.form['emulsion_pressure']),
            float(request.form['emulsion_concentration']),
            float(request.form['quench_water_pressure'])
        ]
        
        # Scale the input data
        scaled_input = scaler.transform([input_data])
        
        # Make predictions
        predictions = model.predict(scaled_input)
        
        # Assess quality based on predefined thresholds
        uts_threshold = 180  # Example threshold, adjust as needed
        elongation_threshold = 15  # Example threshold, adjust as needed
        conductivity_threshold = 60  # Example threshold, adjust as needed
        
        quality = "Good" if (predictions[0][0] >= uts_threshold and 
                             predictions[0][1] >= elongation_threshold and 
                             predictions[0][2] >= conductivity_threshold) else "Not Good"
        
        return render_template('results.html', 
                               uts=round(predictions[0][0], 2),
                               elongation=round(predictions[0][1], 2),
                               conductivity=round(predictions[0][2], 2),
                               quality=quality)
    return render_template('predict.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.json
    input_data = [
        data['chemical_composition'],
        data['casting_temperature'],
        data['cooling_water_temperature'],
        data['casting_speed'],
        data['entry_temp_rolling_mill'],
        data['emulsion_temperature'],
        data['emulsion_pressure'],
        data['emulsion_concentration'],
        data['quench_water_pressure']
    ]
    scaled_input = scaler.transform([input_data])
    predictions = model.predict(scaled_input)
    return jsonify({
        'uts': round(predictions[0][0], 2),
        'elongation': round(predictions[0][1], 2),
        'conductivity': round(predictions[0][2], 2)
    })

if __name__ == '__main__':
    app.run(debug=True)