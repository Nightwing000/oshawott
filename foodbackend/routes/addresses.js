const express = require('express');
const Address = require('../models/Address');
const authenticate = require('../middleware/authenticate');
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
    const { address } = req.body;  
    const userId = req.userId; 

    if (!address) {
        return res.status(400).json({ error: 'Address is required.' });  
    }

    try {
        const newAddress = new Address({ userId, address }); 
        await newAddress.save();
        res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (err) {
        console.error('Error adding address:', err);
        res.status(500).json({ error: 'An error occurred while adding the address.' });
    }
});


router.get('/', authenticate, async (req, res) => {
    const userId = req.userId; 
    try {
        const addresses = await Address.find({ userId }); 
        res.json(addresses);
    } catch (err) {
        console.error('Error fetching addresses:', err);
        res.status(500).json({ error: 'An error occurred while fetching addresses.' });
    }
});


router.put('/:id', authenticate, async (req, res) => {
    const userId = req.userId; 
    const { address } = req.body;  

    try {
        const addressToUpdate = await Address.findOne({ _id: req.params.id, userId }); 
        if (!addressToUpdate) {
            return res.status(404).json({ error: 'Address not found or not authorized' });
        }

        addressToUpdate.address = address || addressToUpdate.address;  

        await addressToUpdate.save();
        res.json({ message: 'Address updated successfully', address: addressToUpdate });
    } catch (err) {
        console.error('Error updating address:', err);
        res.status(500).json({ error: 'An error occurred while updating the address.' });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const userId = req.userId; 
    try {
        const addressToDelete = await Address.findOneAndDelete({ _id: req.params.id, userId }); 
        if (!addressToDelete) {
            return res.status(404).json({ error: 'Address not found or not authorized' });
        }
        res.json({ message: 'Address deleted successfully' });
    } catch (err) {
        console.error('Error deleting address:', err);
        res.status(500).json({ error: 'An error occurred while deleting the address.' });
    }
});

module.exports = router;
