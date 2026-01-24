require('dotenv').config();
const { upsertVectors } = require('../services/pineconeService');

const mockData = [
    {
        id: 'scheme-1',
        text: 'PM-Kisan Samman Nidhi: Provides Rs. 6000 per year to small and marginal farmers with landholdings up to 2 hectares.',
        metadata: { category: 'Scheme', scheme_name: 'PM-Kisan', eligibility: 'Small Farmer' }
    },
    {
        id: 'scheme-2',
        text: 'PM Fasal Bima Yojana: An insurance scheme for crops against natural calamities. Farmers pay a small premium (1.5% - 5%) to cover their crops.',
        metadata: { category: 'Scheme', scheme_name: 'PMFBY', eligibility: 'All Farmers' }
    },
    {
        id: 'manual-1',
        text: 'Early Blight in Tomatoes: Characterized by target-like spots on leaves. Treatment involves Chlorothalonil or Mancozeb sprays and removing infected debris.',
        metadata: { category: 'Disease', crop: 'Tomato', disease: 'Early Blight', type: 'Treatment' }
    }
];

async function seed() {
    try {
        console.log('Seeding mock data to Pinecone...');
        await upsertVectors(mockData);
        console.log('Successfully seeded!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seed();
