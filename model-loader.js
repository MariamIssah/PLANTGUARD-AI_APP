// Plant disease classes based on the referenced model
const PLANT_DISEASES = {
    'Apple___Apple_scab': {
        name: 'Apple Scab',
        description: 'Fungal disease causing dark, scaly lesions on leaves and fruit',
        treatment: [
            'Remove infected leaves and fruit',
            'Apply fungicide early in the growing season',
            'Ensure good air circulation',
            'Clean up fallen leaves in autumn'
        ]
    },
    'Apple___Black_rot': {
        name: 'Black Rot',
        description: 'Fungal disease causing circular purple spots on leaves and rotting fruit',
        treatment: [
            'Prune out dead or diseased branches',
            'Remove mummified fruit',
            'Apply fungicide during growing season',
            'Maintain tree hygiene'
        ]
    },
    'Apple___Cedar_apple_rust': {
        name: 'Cedar Apple Rust',
        description: 'Fungal disease causing bright orange-yellow spots on leaves',
        treatment: [
            'Remove nearby cedar trees if possible',
            'Apply preventative fungicide',
            'Plant resistant varieties',
            'Maintain good air circulation'
        ]
    },
    'Corn___Common_rust': {
        name: 'Common Rust',
        description: 'Fungal disease causing rusty spots on leaves',
        treatment: [
            'Plant resistant hybrids',
            'Apply fungicide when disease first appears',
            'Avoid overhead irrigation',
            'Monitor fields regularly'
        ]
    },
    'Potato___Early_blight': {
        name: 'Early Blight',
        description: 'Fungal disease causing dark spots with concentric rings',
        treatment: [
            'Remove infected leaves',
            'Apply fungicide preventatively',
            'Maintain proper plant spacing',
            'Practice crop rotation'
        ]
    },
    'Tomato___Leaf_Mold': {
        name: 'Leaf Mold',
        description: 'Fungal disease causing yellow spots and fuzzy mold on leaves',
        treatment: [
            'Improve air circulation',
            'Reduce humidity',
            'Remove infected leaves',
            'Apply appropriate fungicide'
        ]
    },
    'Tomato___Septoria_leaf_spot': {
        name: 'Septoria Leaf Spot',
        description: 'Fungal disease causing small dark spots with light centers',
        treatment: [
            'Remove infected leaves',
            'Apply fungicide',
            'Avoid overhead watering',
            'Space plants for good airflow'
        ]
    },
    'Healthy': {
        name: 'Healthy Plant',
        description: 'No disease detected',
        treatment: [
            'Continue regular maintenance',
            'Monitor for any changes',
            'Follow normal watering schedule',
            'Maintain good growing conditions'
        ]
    }
};

class PlantDiseaseDetector {
    constructor() {
        this.model = null;
        this.isLoading = true;
        this.modelStatus = document.getElementById('model-status');
        this.IMAGE_SIZE = 224; // Model expects 224x224 images
    }

    async loadModel() {
        try {
            this.modelStatus.textContent = 'Loading AI model...';
            
            // Load custom model for plant disease detection
            this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/manthan89-py/Plant-Disease-Detection/main/Model/model.json');
            
            this.isLoading = false;
            this.modelStatus.textContent = 'AI model ready';
            this.modelStatus.classList.add('ready');
        } catch (error) {
            console.error('Error loading model:', error);
            this.modelStatus.textContent = 'Error loading AI model';
            this.modelStatus.classList.add('error');
        }
    }

    preprocessImage(imageElement) {
        // Convert image to tensor and preprocess
        return tf.tidy(() => {
            const tensor = tf.browser.fromPixels(imageElement)
                .resizeNearestNeighbor([this.IMAGE_SIZE, this.IMAGE_SIZE])
                .toFloat()
                .expandDims();
            
            // Normalize the image between -1 and 1
            return tensor.div(127.5).sub(1);
        });
    }

    async analyzeImage(imageElement) {
        if (!this.model) {
            throw new Error('Model not loaded');
        }

        // Preprocess image
        const tensor = this.preprocessImage(imageElement);

        // Get predictions
        const predictions = await this.model.predict(tensor).data();
        
        // Clean up tensor
        tensor.dispose();

        // Process predictions
        return this.processResults(predictions);
    }

    processResults(predictions) {
        // Get disease classes
        const diseaseClasses = Object.keys(PLANT_DISEASES);
        
        // Find the highest confidence prediction
        const maxIndex = predictions.indexOf(Math.max(...predictions));
        const predictedDisease = diseaseClasses[maxIndex];
        const confidence = predictions[maxIndex];

        return [{
            type: 'disease',
            details: PLANT_DISEASES[predictedDisease],
            confidence: Math.round(confidence * 100) + '%',
            severity: this.getSeverity(confidence)
        }];
    }

    getSeverity(probability) {
        if (probability > 0.8) return 'severe';
        if (probability > 0.5) return 'moderate';
        return 'low';
    }
}

// Initialize detector
const detector = new PlantDiseaseDetector();

// Load model when page loads
window.addEventListener('DOMContentLoaded', () => {
    detector.loadModel();
}); 